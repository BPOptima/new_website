import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = sectionRef.current?.querySelector(".contact-heading")
      if (heading) {
        gsap.from(heading, {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        })
      }

      const form = sectionRef.current?.querySelector(".contact-form")
      if (form) {
        gsap.from(form, {
          opacity: 0,
          y: 50,
          duration: 1.2,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get("name")
    const email = data.get("email")
    const company = data.get("company")
    const phone = data.get("phone")
    const info = data.get("info")

    const subject = encodeURIComponent(`Inquiry from ${name} - ${company}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nPhone: ${phone}\n\nAdditional Info:\n${info}`
    )
    
    window.location.href = `mailto:dj@bpoptima.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  const inputClass = (field: string) =>
    `w-full bg-transparent border-b ${
      focused === field ? "border-accent" : "border-white/10"
    } py-4 text-text text-[15px] placeholder:text-white/20 focus:outline-none transition-colors duration-500`

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-32 border-t border-border overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-8">
        <div className="contact-heading text-center mb-20">
          <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold tracking-[-0.03em] leading-[1.05] mb-6">
            Ready to own your
            <br />
            AI decisions?
          </h2>
          <p className="text-lg md:text-xl text-text-secondary font-light leading-relaxed max-w-2xl mx-auto">
            Deploy sovereign AI inside your infrastructure in 12 weeks. Talk to our team about your regulated workflow.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-20">
            <div className="w-px h-12 bg-accent/40 mx-auto mb-8" />
            <p className="text-2xl text-text font-light tracking-[-0.02em]">
              We'll be in touch.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="contact-form space-y-0"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
              <div className="py-2">
                <label
                  htmlFor="name"
                  className={`block text-[10px] tracking-[0.2em] uppercase mb-1 transition-colors duration-500 ${
                    focused === "name" ? "text-accent" : "text-white/30"
                  }`}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  className={inputClass("name")}
                />
              </div>

              <div className="py-2">
                <label
                  htmlFor="email"
                  className={`block text-[10px] tracking-[0.2em] uppercase mb-1 transition-colors duration-500 ${
                    focused === "email" ? "text-accent" : "text-white/30"
                  }`}
                >
                  Email ID
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  className={inputClass("email")}
                />
              </div>

              <div className="py-2">
                <label
                  htmlFor="company"
                  className={`block text-[10px] tracking-[0.2em] uppercase mb-1 transition-colors duration-500 ${
                    focused === "company" ? "text-accent" : "text-white/30"
                  }`}
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  onFocus={() => setFocused("company")}
                  onBlur={() => setFocused(null)}
                  className={inputClass("company")}
                />
              </div>

              <div className="py-2">
                <label
                  htmlFor="phone"
                  className={`block text-[10px] tracking-[0.2em] uppercase mb-1 transition-colors duration-500 ${
                    focused === "phone" ? "text-accent" : "text-white/30"
                  }`}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  onFocus={() => setFocused("phone")}
                  onBlur={() => setFocused(null)}
                  className={inputClass("phone")}
                />
              </div>
            </div>

            <div className="pt-8">
              <label
                htmlFor="info"
                className={`block text-[10px] tracking-[0.2em] uppercase mb-1 transition-colors duration-500 ${
                  focused === "info" ? "text-accent" : "text-white/30"
                }`}
              >
                Any other info we should know before discussing your use case
              </label>
              <textarea
                id="info"
                name="info"
                rows={3}
                onFocus={() => setFocused("info")}
                onBlur={() => setFocused(null)}
                className={`${inputClass("info")} resize-none`}
              />
            </div>

            <div className="pt-14 flex flex-col sm:flex-row items-center gap-5">
              <button
                type="submit"
                className="group relative px-10 py-4 bg-transparent border border-white/15 rounded-full text-sm tracking-[0.1em] uppercase text-text hover:border-accent hover:text-accent transition-all duration-500 overflow-hidden"
              >
                <span className="relative z-10">Submit</span>
                <span className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>

              <span className="text-white/20 text-xs hidden sm:block">or</span>

              <a
                href="https://wa.me/918800773030?text=Hi!%20I%20would%20like%20to%20know%20more%20about%20your%20Groundset%20model%20and%20how%20it%20can%20help%20with%20our%20use%20case."
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-7 py-4 border border-[#25D366]/20 rounded-full text-sm tracking-[0.05em] text-[#25D366]/80 hover:border-[#25D366]/50 hover:text-[#25D366] transition-all duration-500"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
