'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Cpu, Globe, Code, Users } from 'lucide-react'

export default function Home() {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      if (!targetRef.current) return
      const { clientX, clientY } = ev
      ;(targetRef.current as HTMLElement).style.setProperty('--mouse-x', `${clientX}px`)
      ;(targetRef.current as HTMLElement).style.setProperty('--mouse-y', `${clientY}px`)
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden" ref={targetRef}>
      <motion.header 
        style={{ opacity, scale }} 
        className="container mx-auto px-4 py-16 h-screen flex flex-col justify-center items-center relative"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(59,130,246,0.15),transparent_50%)]"
            style={{ transform: 'translate3d(0,0,0)' }}
          ></div>
        </div>
        <h1 className="text-6xl font-bold mb-4 text-center">昂言信息</h1>
        <p className="text-2xl mb-8 text-center">专注互联网创新与AI技术</p>
      </motion.header>

      <main className="container mx-auto px-4 py-16">
        <section className="mb-32">
          <h2 className="text-4xl font-bold mb-12 text-center">我们的服务</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: "互联网创新", desc: "打造前沿的网络解决方案，助力企业数字化转型" },
              { icon: Cpu, title: "AI技术", desc: "运用先进的人工智能技术，为您的业务注入智慧动力" },
              { icon: Code, title: "技术咨询", desc: "提供专业的技术咨询服务，助您在数字时代保持领先" }
            ].map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <service.icon className="h-12 w-12 mb-4 text-blue-400" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p>{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-32">
          <h2 className="text-4xl font-bold mb-12 text-center">项目经验</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "医药行业数字化财务支付平台", desc: "为某医药企业打造的全面数字化财务支付解决方案，实现了从订单到支付的全流程自动化，大幅提升了财务效率和准确性。" },
              { title: "出海业务AI营销平台", desc: "为某跨境电商企业开发的智能营销平台，运用AI技术进行市场分析、用户画像和个性化推荐，显著提升了营销效果和转化率。" }
            ].map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p>{project.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-bold mb-12 text-center">关于我们</h2>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <Users className="h-12 w-12 mb-4 text-blue-400 mx-auto" />
            <p className="text-center">
              在昂言信息，我们深知年龄只是一个数字。我们的团队由经验丰富的技术专家组成，
              他们不仅拥有多年的行业经验，更具有无限的创造力和激情。我们相信，
              正是这种丰富的经验和持续创新的精神，使我们能够为客户提供最优质、最前沿的解决方案。
              在这里，每一位团队成员都是宝贵的资产，我们珍视每个人的贡献，共同打造一个充满活力、互相尊重的工作环境。
              选择昂言，就是选择了一个真正懂得价值创造的合作伙伴。
            </p>
          </motion.div>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center">
        <p>&copy; 2023 昂言信息 (angyee.com). 保留所有权利。</p>
      </footer>
    </div>
  )
}