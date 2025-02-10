import React, { useState, useEffect, useRef } from "react";
import Header from "../pages/header";
import { Textarea } from "@/components/ui/textarea";
import logo from "@/images/ChatGPT_logo.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [talk, setTalk] = useState<string[]>([]);
  const [inputText, setInputText] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const [isDisabled, setIsDisabled] = useState(false); // 入力禁止状態

  const RandomWard = [
    "たけのこ",
    "焼酎",
    "にんじん",
    "やまいも",
    "たけとんぼ",
    "山火事",
    "殺人事件",
    "ミニトマト",
    "セーブデータ",
    "証拠",
    "警察",
    "犯人",
    "プロセッサ",
    "CPU",
    "GPU",
    "GPS",
    "ASEAN",
    "HTML",
    "JavaScript",
    "CSS",
    "React",
    "Next",
    "Python",
    "Ruby",
    "Java",
    "tailwindCSS",
    "MountainDew",
    "横文字",
    "しょうたこ",
    "憎しみの連鎖",
    "ユニバ",
    "ディズニー",
    "そんたこ",
    "日本",
    "ブラジル",
    "サッカー",
    "バスケ",
    "薬物",
    "コカイン",
    "麻薬",
    "にんにく",
    "ツムツム",
    "フォートナイト",
    "APEX",
    "高校生",
    "ChatGPT",
    "マインクラフト",
    "プログラミング",
    "りんご",
    "強盗",
    "銀行",
    "完全犯罪"
  ];

  const ClickButton = () => {
    if (!inputText.trim()) return; // 空文字なら送信しない
    if (!inputText.trim() || isDisabled) return; // 既に入力禁止なら送信しない

    setTalk((prevTalk) => [...prevTalk, inputText]);
    setInputText(""); // 入力欄をクリア
    setIsDisabled(true); // 入力を禁止する

    // AIのメッセージを 1.5秒後に追加
    setTimeout(() => {
      // 5つのランダムな単語を取得
      const randomWords = Array.from({ length: 5 }, () => RandomWard[Math.floor(Math.random() * RandomWard.length)]);

      // AIの仮の返信リスト
      const aiResponses = [
        `${inputText}\n\nなるほど、${randomWords[0]}についての質問ですね。\n${randomWords[1]}とは具体的に、${randomWords[2]}が${randomWords[3]}によって${randomWords[4]}となるもののことです。`,
        `${inputText}\n\n${randomWords[0]}は、${randomWords[1]}しても${randomWords[2]}となることはないため、それは間違いです。\nこれを修正するために、${randomWords[3]}をおこなってみてください`,
        `${inputText}\n\nつまり${randomWords[0]}ということですね。\nそれについて私はあまりわからないので、\n<a href='https://testplayer-alt.github.io/study/' target='_blank' id='url'>こちらの記事</a>を参考にしてみてください。`,
        `${inputText}\n\n${randomWords[0]}に挑戦するなら、${randomWords[1]}が必須です。\n追加で${randomWords[2]}を行うことでより確実に${randomWords[3]}を行うことができます。`,
        `${inputText}\n\nいい質問ですね！それについては\n<a href='https://testplayer-alt.github.io/study/' target='_blank' id='url'>こちらの記事</a>を参考にしてみてください。`,
      ];

      const randomIndex = Math.floor(Math.random() * aiResponses.length);
      setTalk((prevTalk) => [...prevTalk, aiResponses[randomIndex]]);

      setIsDisabled(false); // 1.5秒後に入力可能にする
    }, 1500);
  };

  // talk が更新されたら一番下までスクロール
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [talk]);

  return (
    <>
      <Header />
      <div className="grid-area">
        <div className="top-area overflow-auto pb-20 h-[85vh] pt-16">
          {talk.map((message, index) => (
            <div key={index} className={`flex items-start ${index % 2 === 0 ? "justify-end" : "justify-start"}`}>
              {index % 2 !== 0 && (
                <Image
                  alt="logo"
                  src={logo}
                  width={28}
                  height={28}
                  className="w-[28.58px] h-[28.58px] mx-5 my-5"
                />
              )}
              <div
                className={`bg-[#2e2e2e] p-3 rounded-xl mt-5 w-fit whitespace-pre-wrap ${index % 2 === 0 ? "ml-auto mr-6" : ""}`}
                dangerouslySetInnerHTML={{ __html: message }}
              />
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="bottom-area fixed bottom-0 left-0 w-full bg-[#242424] p-4">
          <div className="flex">
            <Textarea
              placeholder="質問を入力してください"
              className="text-4xl resize-none w-[70%] m-auto"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isDisabled} // ← ここで入力禁止
            />
            <Button onClick={ClickButton} disabled={isDisabled} className="w-[20%] h-[70px] m-auto">
              送信
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
