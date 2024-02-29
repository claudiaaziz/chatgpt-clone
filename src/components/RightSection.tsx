"use client"
import React, { useState } from 'react'
import styles from "@/styles/RightSection.module.css"
import chatgptlogo from "@/assets/chatgptlogo.png"
import chatgptlogo2 from "@/assets/chatgptlogo2.png"
import nouserlogo from "@/assets/nouserlogo.png"
import Image from 'next/image'

const openAIAPI = process.env.NEXT_PUBLIC_OPENAI_API_KEY

const RightSection = () => {
  const [message, setMessage] = useState('')
  const [allMessages, setAllMessages] = useState<any[]>([])

  const sendMessage = async () => {
    const url = 'https://api.openai.com/v1/chat/completions'
    const token = `Bearer ${openAIAPI}`
    const model = 'gpt-3.5-turbo'

    const messageToSend = [
      ...allMessages, 
      { role: 'user', content: message }
    ]

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": token,
        "Content-Type": 'application/json'
      }, 
      body: JSON.stringify({
        model: model, messages: messageToSend
      })
    })

    const resJson = await res.json()
    if (resJson) {
      const newAllMessages = [
        ...messageToSend,
        resJson.choices[0].message
      ]
      setAllMessages(newAllMessages)
      setMessage("")
    }
  }

  return (
    <div className={styles.rightSection}>
      <div className={styles.chatgptversion}>
      <p className={styles.text1}>ChatGPT 4</p>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
      </div>

      {allMessages.length > 0 ? 
        <div className={styles.messages}>
          {allMessages.map((msg, idx) => (
            <div key={idx} className={styles.message}>
              <Image src={msg.role === "user" ? nouserlogo : chatgptlogo2} width={50} height={50} alt='logo'/>
              <div className={styles.details}>
                <h2>{msg.role === "user" ? "You" : "ChatGPT"}</h2>
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
        </div> 
        :
        <div className={styles.nochat}>
          <div className={styles.s1}>
            <Image src={chatgptlogo} alt='chatgpt logo' height={70} width={70} />
            <h1>How can I help you today?</h1>
          </div>
          <div className={styles.s2}>
            <div className={styles.suggestioncard}>
              <h2>Explain superconductors</h2>
              <p>like I&apos;m five years old</p>
            </div>
            <div className={styles.suggestioncard}>
              <h2>Write a Python script</h2>
              <p>to automate sending daily email reports</p>
            </div>
            <div className={styles.suggestioncard}>
              <h2>Compare design principles</h2>
              <p>for mobile apps and desktop software</p>
            </div>
            <div className={styles.suggestioncard}>
              <h2>Plan a trip</h2>
              <p>to experience Seoul like a local</p>
            </div>
          </div>
        </div>
      }

      <div className={styles.bottomsection}>
        <div className={styles.messagebar}>
          <input type="text" placeholder='Message ChatGPT...' onChange={(e) => setMessage(e.target.value)} value={message}/>
        <svg onClick={sendMessage} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
        </svg>
        </div>
        <p>ChatGPT can make mistakes. Consider checking important information.</p>
      </div>
    </div>
  )
}

export default RightSection