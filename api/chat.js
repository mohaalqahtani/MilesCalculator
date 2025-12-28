export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question, cards } = req.body;

  const prompt = `
أنت مساعد ذكي لموقع بطاقات بنكية سعودية.
ممنوع تجاوب إلا من الداتا التالية فقط.
إذا ما لقيت إجابة قل: "المعلومة غير متوفرة حالياً".

داتا البطاقات:
${JSON.stringify(cards)}

سؤال المستخدم:
${question}
`;

  const response = await fetch(
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 300,
          temperature: 0.2
        }
      }),
    }
  );

  const data = await response.json();

  const answer =
    data?.[0]?.generated_text?.split("سؤال المستخدم:")?.pop() ||
    "صار خطأ، حاول مرة ثانية";

  res.status(200).json({ answer });
}
