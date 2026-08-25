import { useEffect, useRef, useState } from "react";
import {
  Animated,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnimatedSnowflake } from "../AnimatedSnowflake";
import { Card } from "../Card";
import { StatusBadge } from "../StatusBadge";
import { Button } from "../buttons/Button";
import { ConsignmentTicket } from "./ConsignmentTicket";
import { storageNodes } from "../../lib/mockData/storageNodes";
import { notifyColdStorage } from "../../lib/notificationStore";
import { CHAT_STRINGS, type ChatLanguage } from "../../lib/chatStrings";
import { colors, typography, spacing, radius, shadow } from "../../theme/tokens";
import type { StorageNode } from "../../lib/types";

// Hard-coded, scripted chat — no real AI/backend call. Demonstrates the
// intended supplier flow (send catch -> auto-pinned location -> nearest
// cold storage suggestions -> pick one -> ticket + operator notification).

type ChatMessage =
  | { id: string; from: "ai" | "user"; kind: "text"; text: string }
  | { id: string; from: "ai"; kind: "location"; title: string; subtitle: string }
  | { id: string; from: "ai"; kind: "storageOptions"; options: StorageNode[]; selectedId?: string }
  | { id: string; from: "ai"; kind: "ticketPrompt"; node: StorageNode; species: string; weightKg: number; reference: string };

const NEAREST_NODES = storageNodes;
const SUPPLIER_NAME = "Juan Dela Cruz";
// Fallback transcription for platforms/browsers with no real speech
// recognition available (native builds, Firefox, older Safari) — see
// startListening below, which prefers the real Web Speech API when it
// exists and only falls back to this canned phrase otherwise.
const VOICE_PHRASE = "Yellowfin Tuna 500kg";

const SPEECH_LANG: Record<ChatLanguage, string> = {
  english: "en-US",
  tagalog: "fil-PH",
  // Cebuano/Bisaya has no standard browser speech-recognition locale;
  // Filipino is the closest widely-supported option.
  bisaya: "fil-PH",
};

// The Web Speech API only exists in some browsers (Chrome/Edge, partial
// Safari) and only on web — react-native's TS libs don't declare `window`,
// so this reaches it via `globalThis` to avoid needing the DOM lib.
function getSpeechRecognitionCtor(): any {
  if (Platform.OS !== "web") return null;
  const g = globalThis as any;
  return g.SpeechRecognition || g.webkitSpeechRecognition || null;
}

let uid = 0;
const nextId = () => `msg-${++uid}`;

function parseCatch(raw: string, fallbackSpecies: string): { species: string; weightKg: number } {
  const weightMatch = raw.match(/(\d+(?:\.\d+)?)\s*kg/i);
  const weightKg = weightMatch ? Math.round(parseFloat(weightMatch[1])) : 500;
  const species = raw.replace(/(\d+(?:\.\d+)?)\s*kg/i, "").trim() || fallbackSpecies;
  return { species: titleCase(species), weightKg };
}

function titleCase(s: string) {
  return s
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

export function SupplierChatScreen({
  language,
  onClose,
}: {
  language: ChatLanguage;
  onClose: () => void;
}) {
  const t = CHAT_STRINGS[language];
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [inputEnabled, setInputEnabled] = useState(false);
  const [openTicket, setOpenTicket] = useState<{ node: StorageNode; species: string; weightKg: number; reference: string; issuedAt: Date } | null>(null);
  const [lastCatch, setLastCatch] = useState<{ species: string; weightKg: number }>({ species: t.fallbackSpecies, weightKg: 500 });
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const micPulse = useRef(new Animated.Value(1)).current;
  const micPulseLoop = useRef<Animated.CompositeAnimation | null>(null);

  const pushMessage = (msg: ChatMessage) => setMessages((prev) => [...prev, msg]);

  const aiTyping = (delayMs: number, then: () => void) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      then();
    }, delayMs);
  };

  useEffect(() => {
    aiTyping(600, () => {
      pushMessage({ id: nextId(), from: "ai", kind: "text", text: t.greeting });
      setInputEnabled(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages, isTyping]);

  const handleSend = (overrideText?: string) => {
    const raw = (overrideText ?? inputValue).trim();
    if (!raw) return;

    pushMessage({ id: nextId(), from: "user", kind: "text", text: raw });
    setInputValue("");
    setInputEnabled(false);

    const { species, weightKg } = parseCatch(raw, t.fallbackSpecies);
    setLastCatch({ species, weightKg });

    aiTyping(900, () => {
      pushMessage({ id: nextId(), from: "ai", kind: "text", text: t.parsed(species, weightKg) });
      pushMessage({
        id: nextId(),
        from: "ai",
        kind: "location",
        title: "Barangay Tambler, General Santos City",
        subtitle: "Zone 3, Purok Mahayahay",
      });

      aiTyping(1000, () => {
        pushMessage({ id: nextId(), from: "ai", kind: "text", text: t.searching(weightKg) });
        pushMessage({ id: nextId(), from: "ai", kind: "storageOptions", options: NEAREST_NODES });
      });
    });
  };

  const beginMicPulse = () => {
    micPulse.setValue(1);
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(micPulse, { toValue: 1.3, duration: 450, useNativeDriver: true }),
        Animated.timing(micPulse, { toValue: 1, duration: 450, useNativeDriver: true }),
      ])
    );
    micPulseLoop.current = loop;
    loop.start();
  };

  const endMicPulse = () => {
    micPulseLoop.current?.stop();
    micPulseLoop.current = null;
    micPulse.setValue(1);
  };

  const startListening = () => {
    if (!inputEnabled || isListening) return;
    setIsListening(true);
    beginMicPulse();

    const SpeechRecognitionCtor = getSpeechRecognitionCtor();

    if (SpeechRecognitionCtor) {
      const recognition = new SpeechRecognitionCtor();
      recognition.lang = SPEECH_LANG[language];
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        const transcript: string = event?.results?.[0]?.[0]?.transcript ?? "";
        endMicPulse();
        setIsListening(false);
        if (transcript.trim()) {
          setInputValue(transcript);
          setTimeout(() => handleSend(transcript), 300);
        }
      };
      recognition.onerror = () => {
        endMicPulse();
        setIsListening(false);
      };
      recognition.onend = () => {
        // onresult already handles the success path above; this also
        // covers silence/no-speech/user-cancelled cases.
        endMicPulse();
        setIsListening(false);
      };

      try {
        recognition.start();
      } catch {
        endMicPulse();
        setIsListening(false);
      }
      return;
    }

    // No real speech recognition available on this platform/browser
    // (native app, Firefox, unsupported Safari) — fall back to a canned
    // transcription so voice input still demonstrates the flow everywhere.
    setTimeout(() => {
      endMicPulse();
      setIsListening(false);
      setInputValue(VOICE_PHRASE);
      setTimeout(() => handleSend(VOICE_PHRASE), 400);
    }, 1500);
  };

  const handleSelectStorage = (msgId: string, node: StorageNode, species: string, weightKg: number) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId && m.kind === "storageOptions" ? { ...m, selectedId: node.id } : m))
    );
    pushMessage({ id: nextId(), from: "user", kind: "text", text: t.selected(node.name) });

    aiTyping(900, () => {
      const reference = `FRK-${1000 + Math.floor(Math.random() * 9000)}`;
      pushMessage({ id: nextId(), from: "ai", kind: "text", text: t.confirmed(weightKg, species, node.name, reference) });
      pushMessage({ id: nextId(), from: "ai", kind: "text", text: t.notified(node.name) });

      // Simulate the storage operator actually being notified: pushes a
      // live entry into the Operator Dashboard's Incoming Requests queue.
      notifyColdStorage({
        id: `live-${reference}`,
        requesterName: `${SUPPLIER_NAME} (via Frizko AI)`,
        tons: Math.round((weightKg / 1000) * 100) / 100,
        tempC: -18,
        etaLabel: "Within 2 hours",
        icon: "sailing",
      });

      pushMessage({ id: nextId(), from: "ai", kind: "ticketPrompt", node, species, weightKg, reference });

      aiTyping(700, () => {
        pushMessage({ id: nextId(), from: "ai", kind: "text", text: t.closing });
      });
    });
  };

  if (openTicket) {
    return (
      <ConsignmentTicket
        language={language}
        species={openTicket.species}
        weightKg={openTicket.weightKg}
        supplierName={SUPPLIER_NAME}
        node={openTicket.node}
        reference={openTicket.reference}
        issuedAt={openTicket.issuedAt}
        onClose={() => setOpenTicket(null)}
      />
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <SafeAreaView style={styles.root} edges={["top"]}>
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View style={styles.aiAvatar}>
              <AnimatedSnowflake size={16} color={colors.onSecondary} spinning durationMs={6000} />
            </View>
            <Text style={[typography.titleMd, { color: colors.onSurface }]}>Frizko AI</Text>
          </View>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <MaterialIcons name="close" size={20} color={colors.onSurface} />
          </Pressable>
        </View>

        <ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          contentContainerStyle={styles.thread}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((m) => (
            <ChatBubble
              key={m.id}
              message={m}
              t={t}
              onSelectStorage={(node) => handleSelectStorage(m.id, node, lastCatch.species, lastCatch.weightKg)}
              onViewTicket={(msg) =>
                setOpenTicket({ node: msg.node, species: msg.species, weightKg: msg.weightKg, reference: msg.reference, issuedAt: new Date() })
              }
            />
          ))}

          {isTyping && (
            <View style={styles.bubbleRow}>
              <View style={styles.aiAvatar}>
                <AnimatedSnowflake size={16} color={colors.onSecondary} spinning durationMs={800} />
              </View>
              <View style={[styles.bubble, styles.aiBubble, styles.typingBubble]}>
                <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>{t.typing}</Text>
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.inputBar}>
          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            editable={inputEnabled}
            placeholder={inputEnabled ? t.inputPlaceholder : t.waitingPlaceholder}
            placeholderTextColor={colors.outline}
            style={[styles.input, !inputEnabled && styles.inputDisabled]}
            onSubmitEditing={() => handleSend()}
            returnKeyType="send"
          />
          <Pressable
            onPress={startListening}
            disabled={!inputEnabled || isListening}
            style={[styles.micButton, isListening && styles.micButtonActive, !inputEnabled && styles.micButtonDisabled]}
          >
            <Animated.View style={{ transform: [{ scale: micPulse }] }}>
              <MaterialIcons name="mic" size={20} color={isListening ? colors.onError : colors.secondary} />
            </Animated.View>
          </Pressable>
          <Pressable
            onPress={() => handleSend()}
            disabled={!inputEnabled || !inputValue.trim()}
            style={[styles.sendButton, (!inputEnabled || !inputValue.trim()) && styles.sendButtonDisabled]}
          >
            <MaterialIcons name="send" size={20} color={colors.onSecondary} />
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

function ChatBubble({
  message,
  t,
  onSelectStorage,
  onViewTicket,
}: {
  message: ChatMessage;
  t: (typeof CHAT_STRINGS)["english"];
  onSelectStorage: (node: StorageNode) => void;
  onViewTicket: (msg: Extract<ChatMessage, { kind: "ticketPrompt" }>) => void;
}) {
  const isUser = message.from === "user";

  if (message.kind === "text") {
    return (
      <View style={[styles.bubbleRow, isUser && styles.bubbleRowUser]}>
        {!isUser && (
          <View style={styles.aiAvatar}>
            <AnimatedSnowflake size={16} color={colors.onSecondary} />
          </View>
        )}
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
          <Text style={[typography.bodyMd, isUser ? styles.userText : styles.aiText]}>{message.text}</Text>
        </View>
      </View>
    );
  }

  if (message.kind === "location") {
    return (
      <View style={styles.bubbleRow}>
        <View style={styles.aiAvatar}>
          <AnimatedSnowflake size={16} color={colors.onSecondary} />
        </View>
        <View style={[styles.bubble, styles.aiBubble, { padding: 0, overflow: "hidden" }]}>
          <View style={styles.mapPlaceholder}>
            <View style={styles.mapGridRow} />
            <View style={[styles.mapGridRow, { top: "66%" }]} />
            <View style={styles.mapGridCol} />
            <View style={[styles.mapGridCol, { left: "66%" }]} />
            <MaterialIcons name="location-pin" size={32} color={colors.error} style={styles.mapPin} />
          </View>
          <View style={{ padding: spacing.md }}>
            <Text style={[typography.bodyMd, { color: colors.onSurface, fontWeight: "600" }]}>{message.title}</Text>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, marginTop: 2 }]}>
              {message.subtitle}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  if (message.kind === "storageOptions") {
    return (
      <View style={styles.bubbleRow}>
        <View style={styles.aiAvatar}>
          <AnimatedSnowflake size={16} color={colors.onSecondary} />
        </View>
        <View style={[styles.bubble, styles.aiBubble, { gap: spacing.sm }]}>
          {message.options.map((node) => {
            const isSelected = message.selectedId === node.id;
            const isDisabled = !!message.selectedId && !isSelected;
            return (
              <Pressable
                key={node.id}
                disabled={!!message.selectedId}
                onPress={() => onSelectStorage(node)}
                style={[styles.storageOption, isSelected && styles.storageOptionSelected, isDisabled && styles.storageOptionDisabled]}
              >
                <View style={{ flex: 1 }}>
                  <View style={styles.storageOptionTop}>
                    <Text style={[typography.bodyMd, { color: colors.onSurface, fontWeight: "600" }]}>{node.name}</Text>
                    {node.verified && <MaterialIcons name="verified" size={14} color={colors.tertiaryContainer} />}
                  </View>
                  <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, marginTop: 2 }]}>
                    {node.distanceKm} km away · {node.capacityAvailableKg.toLocaleString()} kg available
                  </Text>
                </View>
                <StatusBadge status={node.status} />
                {isSelected && <MaterialIcons name="check-circle" size={18} color={colors.statusAvailable} />}
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  }

  // ticketPrompt
  return (
    <View style={styles.bubbleRow}>
      <View style={styles.aiAvatar}>
        <AnimatedSnowflake size={16} color={colors.onSecondary} />
      </View>
      <Card style={{ flex: 1, maxWidth: "84%" }}>
        <View style={styles.summaryHeader}>
          <Text style={[typography.titleMd, { color: colors.onSurface }]}>{message.species}</Text>
          <StatusBadge status="matched" />
        </View>
        <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginBottom: spacing.sm }]}>
          {message.weightKg} kg · {message.node.name}
        </Text>
        <View style={styles.referenceRow}>
          <MaterialIcons name="receipt-long" size={16} color={colors.outline} />
          <Text style={[typography.labelSm, { color: colors.outline }]}>{message.reference}</Text>
        </View>
        <Button label={t.viewTicket} onPress={() => onViewTicket(message)} style={{ marginTop: spacing.sm }} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.marginMobile,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceContainerHigh,
  },
  brandRow: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceContainerLow,
  },
  thread: { padding: spacing.marginMobile, gap: spacing.md, paddingBottom: spacing.xl },
  bubbleRow: { flexDirection: "row", alignItems: "flex-end", gap: spacing.xs, maxWidth: "100%" },
  bubbleRowUser: { flexDirection: "row-reverse" },
  aiAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  bubble: {
    maxWidth: "80%",
    borderRadius: radius.lg,
    padding: spacing.sm + 2,
  },
  aiBubble: {
    backgroundColor: colors.surfaceContainerLowest,
    borderBottomLeftRadius: 4,
    ...shadow.card,
  },
  userBubble: {
    backgroundColor: colors.secondary,
    borderBottomRightRadius: 4,
  },
  aiText: { color: colors.onSurface },
  userText: { color: colors.onSecondary },
  typingBubble: { paddingVertical: spacing.sm },
  mapPlaceholder: {
    width: "100%",
    height: 110,
    backgroundColor: colors.surfaceContainerLow,
    overflow: "hidden",
  },
  mapGridRow: { position: "absolute", left: 0, right: 0, top: "33%", height: 1, backgroundColor: colors.surfaceVariant },
  mapGridCol: { position: "absolute", top: 0, bottom: 0, left: "33%", width: 1, backgroundColor: colors.surfaceVariant },
  mapPin: { position: "absolute", top: "50%", left: "50%", marginLeft: -16, marginTop: -30 },
  storageOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radius.DEFAULT,
    padding: spacing.sm,
  },
  storageOptionSelected: {
    borderColor: colors.secondary,
    backgroundColor: colors.secondaryContainer,
  },
  storageOptionDisabled: { opacity: 0.4 },
  storageOptionTop: { flexDirection: "row", alignItems: "center", gap: 4 },
  summaryHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: spacing.xs },
  referenceRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceContainerHigh,
    backgroundColor: colors.surfaceContainerLowest,
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    paddingHorizontal: spacing.md,
    color: colors.onSurface,
    backgroundColor: colors.surface,
  },
  inputDisabled: { opacity: 0.6 },
  micButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: "center",
    justifyContent: "center",
  },
  micButtonActive: { backgroundColor: colors.error },
  micButtonDisabled: { opacity: 0.4 },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: { opacity: 0.4 },
});
