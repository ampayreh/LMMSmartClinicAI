import { supabase } from "@/integrations/supabase/client";

type Message = { role: "user" | "assistant"; content: string };

export async function getAIResponse(messages: Message[], language: "en" | "lg" = "en"): Promise<string> {
  try {
    // Client-side validation before sending
    const validLang = language === "lg" ? "lg" : "en";
    const sanitized = messages
      .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim().length > 0)
      .slice(-20)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 2000).trim() }));

    if (sanitized.length === 0) throw new Error("No valid messages");

    const { data, error } = await supabase.functions.invoke("chat", {
      body: { messages: sanitized, language: validLang },
    });

    if (error) throw error;
    if (data?.reply) return data.reply;
    throw new Error("No reply from AI");
  } catch (e) {
    console.warn("AI chat failed, falling back to local responses:", e);
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
    return getLocalResponse(lastUserMsg?.content || "", language);
  }
}

const DISCLAIMER_EN = "\n\n_This assistant provides general information only and does not offer medical advice, diagnosis, or treatment. For health concerns, please visit us or call +256 741 008 049._";
const DISCLAIMER_LG = "\n\n_Omuyambi ono akuwa amawulire agawamu bokka. Takuwa bulezi. Bw'oba olina ensonga z'obulamu, tujje oba okuba ku +256 741 008 049._";

export function getLocalResponse(userMessage: string, language: "en" | "lg" = "en"): string {
  const msg = userMessage.toLowerCase();

  if (language === "lg") {
    if (msg.includes("mpeereza") || msg.includes("service")) {
      return "Lynda Michelle Medical Centre erina empeereza 8 ennene:\n\n1️⃣ **OPD** : Okulaba abalwadde bonna\n2️⃣ **Obulamu bw'Abakyala** : ANC, okuzaala obulungi, enteekateeka y'amaka\n3️⃣ **Laabu** : Malaria, HIV, syphilis, n'ebirala\n4️⃣ **Okugema** : Abaana n'abakulu\n5️⃣ **Famasi** : Eddagala\n6️⃣ **Okulongoosa Okutono** : Ebiwundu, okutungako\n7️⃣ **Eby'obulamu mu Kitundu** : Okuyigiriza\n8️⃣ **Okujjanjaba Awaka** : Abakadde n'abalwadde\n\nOyagala okumanya ebisingawo ku mpeereza yonna?" + DISCLAIMER_LG;
    }
    if (msg.includes("ssaawa") || msg.includes("guggula")) {
      return "🕐 **Essaawa ez'okukola ku LMMC:**\n\n• Bbalaza okutuuka Lwamukaaga: 8:00 AM – 6:00 PM\n• Ssabbiiti: Empeereza z'amangu zokka\n\n📍 Plot 1246, Budo-Kimbejja, Nsangi\n☎️ +256 772 590 967" + DISCLAIMER_LG;
    }
    if (msg.includes("wa") || msg.includes("kifo") || msg.includes("direction")) {
      return "📍 **Engeri gy'otujjirako:**\n\nTuli ku Plot 1246, Budo-Kimbejja, Nsangi Sub-County, Wakiso District.\n\nTutuukirira okuva mu Buddo, Kyengera, ne Nsangi.\n\n☎️ Bw'oyagala obuyambi ku kkubo, tuwandiikire ku WhatsApp: +256 741 008 049" + DISCLAIMER_LG;
    }
    return "Weebale okukoma! Nsobola okukuyamba ku:\n\n• Empeereza zaffe 8\n• Essaawa ez'okukola\n• Engeri gy'otujjirako\n• Engeri gy'weetegekera okujja\n\nMbuulira by'oyagala okumanya! Oba kuba ku ☎️ +256 741 008 049." + DISCLAIMER_LG;
  }

  // English responses (navigation, hours, services, directions, booking only)
  if (msg.includes("service")) {
    return "Lynda Michelle Medical Centre offers 8 core services:\n\n1️⃣ **Outpatient Care (OPD)** : General consultations for all ages\n2️⃣ **Maternal & Reproductive Health** : ANC, safe deliveries, family planning\n3️⃣ **Laboratory & Diagnostics** : Malaria, HIV, syphilis, pregnancy tests and more\n4️⃣ **Immunization** : Child and adult vaccinations\n5️⃣ **Pharmacy** : Essential medicines\n6️⃣ **Minor Surgery** : Wound care, suturing, abscess drainage\n7️⃣ **Community Health Education** : Outreach programmes\n8️⃣ **Home-Based Care** : Visits for elderly and homebound patients\n\nWould you like to know more about a specific service?" + DISCLAIMER_EN;
  }

  if (msg.includes("hour") || msg.includes("time") || msg.includes("open")) {
    return "🕐 **LMMC Operating Hours:**\n\n• Monday to Saturday: 8:00 AM – 6:00 PM\n• Sunday: Emergency Services Only\n\n📍 **Location:** Plot 1246, Budo-Kimbejja, Nsangi, Wakiso District\n📫 P.O. Box 148398, Kampala GPO\n☎️ +256 772 590 967\n📧 admin@lyndamichellemed.com\n💬 WhatsApp: +256 741 008 049\n\nWe welcome walk-ins. No appointment is needed for OPD consultations." + DISCLAIMER_EN;
  }

  if (msg.includes("direction") || msg.includes("where") || msg.includes("location") || msg.includes("map") || msg.includes("find")) {
    return "📍 **How to find us:**\n\nWe are located at Plot 1246, Budo-Kimbejja, Nsangi Sub-County, Wakiso District, Uganda.\n\nThe clinic is accessible from Buddo, Kyengera, and surrounding areas in Nsangi.\n\n☎️ For directions, WhatsApp us at +256 741 008 049 and we'll guide you." + DISCLAIMER_EN;
  }

  if (msg.includes("book") || msg.includes("appointment") || msg.includes("visit")) {
    return "📋 **How to visit us:**\n\nWalk-in consultations are welcome Monday to Saturday, 8:00 AM to 6:00 PM. No appointment is required for outpatient visits.\n\nFor planned visits or maternal care, you can call ahead to reduce wait times:\n☎️ +256 741 008 049 (WhatsApp)\n☎️ +256 772 590 967\n\nPlease bring any previous medical records, current medications, and a valid form of identification." + DISCLAIMER_EN;
  }

  if (msg.includes("maternal") || msg.includes("pregnant") || msg.includes("antenatal") || msg.includes("anc") || msg.includes("delivery") || msg.includes("baby")) {
    return "🤰 **Maternal & Reproductive Health Services:**\n\nWe provide comprehensive care for mothers and families, including:\n• Antenatal care (ANC)\n• Safe deliveries with a registered midwife\n• Postnatal and post-abortion care\n• Family planning counselling and methods\n• Youth-friendly sexual and reproductive health services\n\nOur maternal health programme operates in partnership with Marie Stopes Uganda.\n\n📍 Visit us Monday to Saturday, 8 AM to 6 PM\n☎️ +256 741 008 049" + DISCLAIMER_EN;
  }

  if (msg.includes("family planning") || msg.includes("contraceptive") || msg.includes("birth control")) {
    return "💊 **Family Planning Services:**\n\nWe offer a range of family planning methods, including pills, injectables, implants, IUDs, and emergency contraception. All methods include free counselling to help you choose the best option.\n\nOur services are delivered in partnership with Marie Stopes Uganda.\n\nFor specific details and availability, visit us or call:\n☎️ +256 741 008 049 (WhatsApp)\n📍 Monday to Saturday, 8 AM to 6 PM" + DISCLAIMER_EN;
  }

  if (msg.includes("lab") || msg.includes("test") || msg.includes("diagnos")) {
    return "🔬 **Laboratory & Diagnostics:**\n\nWe offer on-site rapid diagnostic testing with same-day results, including tests for malaria, HIV (confidential), syphilis, pregnancy, blood sugar, H. Pylori, and more.\n\nWalk-ins are welcome. No appointment needed.\n\n📍 Monday to Saturday, 8 AM to 6 PM\n☎️ +256 741 008 049" + DISCLAIMER_EN;
  }

  if (msg.includes("pharmacy") || msg.includes("medicine") || msg.includes("drug")) {
    return "💊 **Pharmacy:**\n\nOur on-site pharmacy stocks essential medicines for common conditions, maternal health, chronic disease, and paediatric care. Medicines are sourced through Joint Medical Stores and other approved suppliers.\n\nYour clinician will prescribe what you need and you can collect it on-site.\n\n📍 Monday to Saturday, 8 AM to 6 PM" + DISCLAIMER_EN;
  }

  if (msg.includes("cost") || msg.includes("price") || msg.includes("how much") || msg.includes("expensive") || msg.includes("afford") || msg.includes("pay")) {
    return "💰 **Costs and Payment:**\n\nWe strive to keep our services affordable for the community. Costs vary depending on the service and treatment required.\n\nWe accept cash and mobile money. For specific pricing, please visit us or call ahead:\n☎️ +256 741 008 049 (WhatsApp)\n☎️ +256 772 590 967\n\n📍 Monday to Saturday, 8 AM to 6 PM" + DISCLAIMER_EN;
  }

  if (msg.includes("whatsapp")) {
    return "💬 **WhatsApp:**\n\nYou can reach us on WhatsApp at +256 741 008 049 for inquiries, directions, or to prepare for your visit.\n\nOur team responds during operating hours: Monday to Saturday, 8 AM to 6 PM." + DISCLAIMER_EN;
  }

  return "Thank you for reaching out! I can help you with:\n\n• Our 8 healthcare services\n• Operating hours and location\n• Directions to the clinic\n• How to book or prepare for a visit\n• Maternal health and family planning information\n• Lab and pharmacy services\n\nWhat would you like to know? You can also call us directly at ☎️ +256 741 008 049.\n\n📍 Plot 1246, Budo-Kimbejja, Nsangi, Wakiso District\n🕐 Monday to Saturday: 8 AM to 6 PM" + DISCLAIMER_EN;
}
