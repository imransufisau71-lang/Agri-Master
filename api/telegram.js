export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const BOT_TOKEN = "8724116418:AAF4YTsrynt4dosRoW4ASUpA2ClcnrprFbo"
  const CHAT_ID = "8660626313"

  const data = req.body

  const text = `
📦 NEW ORDER

🆔 Order ID: ${data.orderId}

👤 Name: ${data.customer.name}
📞 Phone: ${data.customer.phone}

📍 Address:
${data.customer.address}
${data.customer.upazila}, ${data.customer.district}

🛒 Quantity: ${data.quantity}
💰 Total: ৳${data.total}

📝 Notes:
${data.customer.notes || "None"}
`

  try {

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text
      })
    })

    return res.status(200).json({ success: true })

  } catch (error) {

    return res.status(500).json({
      success: false,
      error: error.message
    })

  }
}