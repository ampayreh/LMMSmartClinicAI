import { supabase } from "@/integrations/supabase/client";

type Message = { role: "user" | "assistant"; content: string };

export async function getAIResponse(messages: Message[], language: "en" | "lg" = "en"): Promise<string> {
  try {
    const { data, error } = await supabase.functions.invoke("chat", {
      body: { messages, language },
    });

    if (error) throw error;
    if (data?.reply) return data.reply;
    throw new Error("No reply from AI");
  } catch (e) {
    console.warn("AI chat failed, falling back to mock:", e);
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
    return getMockResponse(lastUserMsg?.content || "", language);
  }
}

export function getMockResponse(userMessage: string, language: "en" | "lg" = "en"): string {
  const msg = userMessage.toLowerCase();

  if (language === "lg") {
    if (msg.includes("musujja") || msg.includes("malaria")) {
      return "Ku nsonga y'omusujja gwe buwuka, bino by'osuubira ku LMMC:\n\n🔬 **Okukebera Malaria (RDT):** 5,000 UGX\n💊 **Obujjanjabi (bw'oba olina omusujja):**\n• P-Alaxin (ekkoosi yonna): 23,000 UGX\n• Oba Lonart: 21,000 UGX\n• Paracetamol: 250 UGX/kipiira\n\n💰 **Omuwendo ogw'okugereka:** 30,000–45,000 UGX\n\n⚠️ Tukusaba ojje ku LMMC okukebererwa obulungi.";
    }
    if (msg.includes("mpeereza") || msg.includes("service")) {
      return "Lynda Michelle Medical Centre erina empeereza 8 ennene:\n\n1️⃣ **OPD** — Okulaba abalwadde bonna\n2️⃣ **Obulamu bw'Abakyala** — ANC, okuzaala obulungi, enteekateeka y'amaka\n3️⃣ **Laabu** — Malaria, HIV, syphilis, n'ebirala\n4️⃣ **Okugema** — Abaana n'abakulu\n5️⃣ **Famasi** — Eddagala 178\n6️⃣ **Okulongoosa Okutono** — Ebiwundu, okutungako\n7️⃣ **Eby'obulamu mu Kitundu** — Okuyigiriza\n8️⃣ **Okujjanjaba Awaka** — Abakadde n'abalwadde\n\nOyagala okumanya ebisingawo ku mpeereza yonna?";
    }
    if (msg.includes("ssaawa") || msg.includes("guggula")) {
      return "🕐 **Essaawa ez'okukola ku LMMC:**\n\n• Bbalaza–Lwamukaaga: 8:00 AM – 6:00 PM\n• Ssabbiiti: Empeereza z'amangu zokka\n\n📍 Plot 1246, Budo-Kimbejja, Nsangi\n☎️ +256 772 590 967";
    }
    return "Weebale okukoma! Nsobola okukuyamba ku:\n\n• Empeereza zaffe 8\n• Emiwendo gy'obujjanjabi\n• Essaawa ez'okukola\n• Engeri gy'weetegekera okujja\n\nMbuulira by'oyagala okumanya! Oba kuba ku ☎️ +256 772 590 967.";
  }

  // English fallback (existing)
  if (msg.includes("malaria")) {
    return "Based on your concern about malaria, here's what to expect at LMMC:\n\n🔬 **Malaria RDT Test:** 5,000 UGX\n💊 **Treatment (if positive):**\n• P-Alaxin tablets (full course): 23,000 UGX\n• OR Lonart tablets: 21,000 UGX\n• Paracetamol for fever: 250 UGX/tablet\n\n💰 **Estimated total visit:** 30,000–45,000 UGX\n\nFor children, syrup formulations are available.\n\n⚠️ We recommend visiting LMMC for a proper test. Self-diagnosis can be dangerous.\n\n📍 Plot 1246, Budo-Kimbejja | ☎️ +256 772 590 967";
  }

  if (msg.includes("fever") || msg.includes("headache")) {
    return "I'm sorry to hear you're not feeling well. Fever and headache are common symptoms in our region and could indicate several conditions including malaria, which is prevalent in Wakiso District.\n\n🏥 **We recommend visiting LMMC for:**\n• Malaria RDT test: 5,000 UGX\n• General consultation: 10,000–15,000 UGX\n• Blood sugar check (if needed): 5,000 UGX\n\n💊 While you prepare to visit, stay hydrated and rest.\n\n⚠️ If you experience severe headache, confusion, difficulty breathing, or very high fever, please come immediately or call us.\n\n📍 Mon–Sat: 8AM–6PM | ☎️ +256 772 590 967";
  }

  if (msg.includes("service")) {
    return "Lynda Michelle Medical Centre offers 8 core services:\n\n1️⃣ **Outpatient Care (OPD)** — General consultations for all ages\n2️⃣ **Maternal & Reproductive Health** — ANC, safe deliveries, family planning\n3️⃣ **Laboratory & Diagnostics** — Malaria, HIV, syphilis, pregnancy tests & more\n4️⃣ **Immunization** — Child & adult vaccinations\n5️⃣ **Pharmacy** — 178 medications in stock\n6️⃣ **Minor Surgery** — Wound care, suturing, abscess drainage\n7️⃣ **Community Health Education** — Outreach programs\n8️⃣ **Home-Based Care** — Visits for elderly & homebound patients\n\nWould you like details about any specific service?";
  }

  if (msg.includes("hour") || msg.includes("time") || msg.includes("open")) {
    return "🕐 **LMMC Operating Hours:**\n\n• Monday–Saturday: 8:00 AM – 6:00 PM\n• Sunday: Emergency Services Only\n\n📍 **Location:** Plot 1246, Budo-Kimbejja, Nsangi, Wakiso District\n📫 P.O. Box 148398, Kampala GPO\n☎️ +256 772 590 967\n📧 admin@lyndamichellemed.com\n💬 WhatsApp: +256 772 590 967\n\nWe welcome walk-ins! No appointment needed for OPD consultations.";
  }

  if (msg.includes("pregnant") || msg.includes("antenatal") || msg.includes("anc") || msg.includes("baby") || msg.includes("delivery")) {
    return "Congratulations and welcome! Our maternal health services include:\n\n🤰 **Antenatal Care (ANC):**\n• ANC card (first visit): 4,000 UGX\n• Pregnancy test (HCG): 2,000 UGX\n• HIV test: 5,000 UGX\n• Syphilis test: 5,000 UGX\n• Blood sugar: 5,000 UGX\n• Supplements (folic acid, iron, multivitamins): ~300 UGX/day\n\n🏥 **Estimated first ANC visit:** 25,000–35,000 UGX\n📋 **Follow-up visits:** 10,000–15,000 UGX each\n\n👶 **Delivery:**\n• Mama kit (essential supplies): 25,000 UGX\n• Safe delivery services available with experienced midwives\n\n👩‍⚕️ Our registered midwife Jenipher Nakyejjusa leads our maternal health program, in partnership with Marie Stopes International.\n\n📍 Visit us Mon–Sat 8AM–6PM | ☎️ +256 772 590 967";
  }

  if (msg.includes("family planning") || msg.includes("contraceptive") || msg.includes("birth control")) {
    return "We offer comprehensive family planning services in partnership with Marie Stopes International:\n\n💊 **Pills:** Lydia contraceptives — 3,000 UGX/month\n💉 **Injectable:** Lydia 150mg — 5,000 UGX (3-month protection)\n📌 **Implants:**\n• Implanon (3 years): 20,000 UGX\n• Jadelle (5 years): 25,000 UGX\n🔗 **IUD** (up to 10 years): 30,000 UGX\n🆘 **Emergency contraception:** Lydia emergency — 5,000 UGX\n\nAll methods include free counseling. Our midwife will help you choose the best option for your needs.\n\n📍 Visit us Mon–Sat 8AM–6PM | ☎️ +256 772 590 967";
  }

  if (msg.includes("cost") || msg.includes("price") || msg.includes("how much") || msg.includes("expensive") || msg.includes("cheap") || msg.includes("afford")) {
    return "Here are estimated costs for common services at LMMC (in UGX):\n\n🏥 **Consultations:** 10,000–15,000\n🔬 **Lab Tests:**\n• Malaria RDT: 5,000\n• HIV test: 5,000\n• Pregnancy test: 2,000\n• Blood sugar: 5,000\n\n💊 **Common Treatments:**\n• Malaria (full course): 30,000–45,000\n• UTI/STI antibiotics: 20,000–40,000\n• Cold/flu treatment: 15,000–25,000\n\n🤰 **Maternal:**\n• First ANC visit: 25,000–35,000\n• Mama kit: 25,000\n• Family planning: 3,000–30,000\n\n💡 These are estimates. Your clinician will confirm exact costs based on your needs.\n\nWould you like details about a specific treatment?";
  }

  if (msg.includes("hiv") || msg.includes("test")) {
    return "We offer confidential testing services:\n\n🔬 **Available Tests:**\n• HIV test: 5,000 UGX (confidential, results same day)\n• Malaria RDT: 5,000 UGX\n• Syphilis test: 5,000 UGX\n• Pregnancy test (HCG): 2,000 UGX\n• H. Pylori test: 5,000 UGX\n• Blood sugar (RBS): 5,000 UGX\n\nAll tests are conducted by trained lab staff with quick turnaround.\n\nWe partner with PEPFAR & USAID for HIV testing, prevention, and treatment support.\n\n📍 Walk-ins welcome Mon–Sat 8AM–6PM | ☎️ +256 772 590 967";
  }

  return "Thank you for reaching out! I can help you with:\n\n• Information about our 8 medical services\n• Estimated costs for treatments and tests\n• Operating hours and location\n• How to prepare for your visit\n• Maternal health and family planning\n\nCould you tell me more about what you need? Or feel free to call us directly at ☎️ +256 772 590 967.\n\n📍 Plot 1246, Budo-Kimbejja, Nsangi, Wakiso District\n🕐 Mon–Sat: 8AM–6PM";
}
