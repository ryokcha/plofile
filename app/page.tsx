"use client" // Next.jsのクライアントコンポーネントとして動作させる指定

// 必要なコンポーネントとアイコンをインポート（外部ライブラリから機能を取り込む）
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" // プロフィール画像用
import { Button } from "@/components/ui/button" // ボタン用
import { Card } from "@/components/ui/card" // カード形式のレイアウト用
import { Instagram, Twitter,Github, Youtube, Globe, Mail, ExternalLink } from "lucide-react" // アイコン用
import { useState, useEffect } from "react"

// microCMSからphotoworksを取得する関数
async function fetchPhotoWorks() {
  const endpoint = process.env.NEXT_PUBLIC_MICROCMS_ENDPOINT
  const apiKey = process.env.NEXT_PUBLIC_MICROCMS_API_KEY
  if (!endpoint) throw new Error("microCMS endpoint is not set in .env.local")
  if (!apiKey) throw new Error("microCMS API key is not set in .env.local")
  const res = await fetch(endpoint, {
    headers: {
      "X-API-KEY": apiKey,
    },
    cache: "no-store",
  })
  if (!res.ok) throw new Error("Failed to fetch photoworks")
  const data = await res.json()
  return data.contents
}

// メインのコンポーネント（ページ全体の構造を定義）
export default function Component() {
  // 言語ごとのテキスト
  const texts = {
    ja: {
      name: "中井　涼日",
      intro: (
        <>
          高校生。ダンスのインストラクター。
          <br />
          英語とコード（情報技術・プログラミング）を勉強中。趣味はカメラ。
          <br />
          興味があればSNSからご連絡ください。
        </>
      ),
      links: [
        {
          title: "note",
          url: "https://note.com/0rchid3",
          icon: <ExternalLink className="w-4 h-4" />,
          description: "日々の活動を不定期で更新",
        },
        {
          title: "お問い合わせ（メール）",
          url: "mailto:orchid38okashii@gmail.com",
          icon: <Mail className="w-4 h-4" />,
          description: "24時間以内に返信します。お急ぎの場合は各種SNSのDMにてお願いします。",
        },
      ],
      copyright: "© 2025 Ryoka Nakai. All rights reserved.",
      langBtn: "English",
      // galleryTitle: "写真の作例",
      // galleryDesc: "趣味で撮影した写真の一部です。",
      // gallery: [
      //   {
      //     src: "/sample1.jpg",
      //     title: "夕焼けの河川敷",
      //     desc: "近所の河川敷で撮影した夕焼け。",
      //   },
      //   {
      //     src: "/sample2.jpg",
      //     title: "桜と青空",
      //     desc: "春に撮影した満開の桜。",
      //   },
      // ],
    },
    en: {
      name: "Ryoka Nakai",
      intro: (
        <>
          Japanese high school student. Instructor of dance.
          <br />
          Learning English deeply and code a bit and photography.
          <br />
          If you have any interest, please contact me with SNS.
        </>
      ),
      links: [
        {
          title: "note",
          url: "https://note.com/0rchid3",
          icon: <ExternalLink className="w-4 h-4" />,
          description: "Irregularly updating my daily activities.",
        },
        {
          title: "Contact",
          url: "mailto:ryouka6922@icloud.com",
          icon: <Mail className="w-4 h-4" />,
          description: "I will reply within 24 hours. If urgent, please DM me on SNS.",
        },
      ],
      copyright: "© 2025 Ryoka Nakai. All rights reserved.",
      langBtn: "日本語",
      galleryTitle: "Photo Works",
      galleryDesc: "Some of my photography works as a hobby.",
      gallery: [
        {
          src: "/sample1.jpg",
          title: "Riverside Sunset",
          desc: "Sunset at the riverside near my home.",
        },
        {
          src: "/sample2.jpg",
          title: "Cherry Blossoms & Blue Sky",
          desc: "Full-bloom cherry blossoms in spring.",
        },
      ],
    },
  }

  // 言語状態
  const [lang, setLang] = useState<'ja' | 'en'>('ja')
  const t = texts[lang]

  // ソーシャルメディアのリンク情報（上部に表示される丸いアイコン用）
  const socialLinks = [
    {
      icon: <Twitter className="w-5 h-5" />, // Twitterアイコン
      url: "https://x.com/bell_veil_496", // TwitterのURL
      label: "Twitter", // アクセシビリティ用のラベル
    },
    { icon: <Instagram className="w-5 h-5" />, url: "https://instagram.com/374s.z/", label: "Instagram" },
  //   { icon: <Youtube className="w-5 h-5" />, url: "https://youtube.com", label: "YouTube" },
  {icon: <Github className="w-5 h-5" />, url: "https://github.com/ryokcha", label: "GitHub"}
  ]

  // 写真作例データ
  const [photoWorks, setPhotoWorks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPhotoWorks()
      .then((data) => {
        setPhotoWorks(data)
        setLoading(false)
      })
      .catch((e) => {
        setError(e.message)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900 py-8 px-4">
      {/* プロフィールセクション - ページ上部の個人情報表示エリア */}
      <div className="text-center mb-8">
        {/* 言語切り替えボタン */}
        <div className="flex justify-end mb-2">
          <Button
            variant="outline"
            size="sm"
            className="ml-auto"
            onClick={() => setLang(lang === 'ja' ? 'en' : 'ja')}
          >
            {t.langBtn}
          </Button>
        </div>
        {" "}
        {/* 中央揃えで下に余白8を設定 */}
        {/* プロフィール画像 - 丸い形で表示 */}
        <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-white shadow-lg">
          {/* 実際の画像（存在する場合） */}
          <AvatarImage src="/plofile.JPG?height=96&width=96" alt="プロフィール画像" />
          {/* 画像がない場合の代替表示（イニシャルなど） */}
          <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-400 to-indigo-500 text-white">
            なかい
          </AvatarFallback>
        </Avatar>
        {/* 名前の表示 */}
        <h1 className="text-2xl font-bold text-white mb-2">{t.name}</h1>
        {/* 自己紹介文 */}
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {t.intro}
        </p>
        {/* ソーシャルメディアリンク - 丸いアイコンボタンの行 */}
        <div className="flex justify-center gap-3 mb-6">
          {" "}
          {/* 中央揃えで横並び、間隔3 */}
          {/* socialLinks配列の各要素に対してボタンを生成 */}
          {socialLinks.map((social, index) => (
            <Button
              key={index} // Reactが要素を識別するためのキー
              variant="outline" // ボタンのスタイル（枠線あり）
              size="icon" // アイコン用のサイズ
              className="rounded-full bg-white/20 hover:bg-white/30 border-gray-300 hover:scale-110 transition-all duration-200 text-gray-300 hover:text-white"
              asChild // 子要素（aタグ）をボタンとして扱う
            >
              {/* 実際のリンク要素 */}
              <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                {social.icon} {/* アイコンを表示 */}
              </a>
            </Button>
          ))}
        </div>
      </div>

      {/* メインリンクセクション - カード形式のリンク一覧 */}
      <div className="space-y-4 mb-8">
        {t.links.map((link, index) => (
          <Card
            key={index}
            className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-white/10 border-gray-600"
          >
            <Button variant="ghost" className="w-full h-auto p-0 hover:bg-white/5" asChild>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <div className="flex items-center gap-4 p-4 w-full">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full flex items-center justify-center text-blue-300">
                    {link.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-white text-sm">{link.title}</h3>
                    <p className="text-gray-300 text-xs">{link.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              </a>
            </Button>
          </Card>
        ))}
      </div>

      {/* 写真作例セクション */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-white mb-2">photoworks</h2>
        {/* <p className="text-gray-300 text-sm mb-4">microCMSから取得した写真作例</p> */}
        {loading && <p className="text-gray-400">Loading...</p>}
        {error && <p className="text-red-400">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {photoWorks.map((item, idx) => (
            <a
              key={item.id || idx}
              href={item.URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="bg-white/10 border-gray-600 overflow-hidden cursor-pointer hover:shadow-xl transition-all">
                <img src={item.photo?.url} alt={item.title} className="w-full h-61 object-cover" />
                <div className="p-3">
                  <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                  {item.subtitle && <p className="text-gray-300 text-xs mb-1">{item.subtitle}</p>}
                  {/* {item.URL && (
                    <span className="text-blue-300 underline text-xs">{item.URL}</span>
                  )} */}
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>

      {/* フッター - ページ下部の著作権表示 */}
      <div className="text-center mt-8 text-xs text-gray-400">
        <p>{t.copyright}</p>
      </div>
    </div>
  )
}
