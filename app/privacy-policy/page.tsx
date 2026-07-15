import React from "react";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

export const metadata = {
    title: "Privacy Policy",
    description: "Privacy Policy for Cwmservices — how we collect, use, and protect your information.",
    alternates: {
        canonical: "https://cwmservices.dev/privacy-policy",
    }
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="mb-10">
            <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-dark mb-3">
                {title}
            </h2>
            <div className="font-body text-[15px] md:text-base text-ink-dark-muted leading-relaxed space-y-4">
                {children}
            </div>
        </section>
    );
}

function PrivacyPolicyPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#0A0B10]">
            <Header />

            <main className="flex-grow py-16 lg:py-20">
                <div className="w-[92%] lg:w-[80%] xl:w-[70%] max-w-[900px] mx-auto">



                    <h1 className="font-display mt-5 text-3xl md:text-4xl lg:text-[42px] font-bold text-ink-dark">
                        Privacy Policy
                    </h1>
                    <p className="font-body mt-2 text-sm text-ink-dark-muted/70">
                        Last updated: July 16, 2026
                    </p>

                    <div className="mt-10">
                        <Section title="1. Introduction">
                            <p>
                                Cwmservices is a software development practice operated by Masood Ur Rehman, an
                                independent freelance developer working with a small supporting team. Cwmservices is
                                not currently a registered company; it operates as a sole proprietorship while
                                registration is planned for the future. This Privacy Policy explains what
                                information is collected through this website, how it is used, and the choices
                                you have regarding your information.
                            </p>
                        </Section>

                        <Section title="2. Information We Collect">
                            <p>We may collect the following types of information when you interact with this website:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Contact details you provide, such as your name, email address, and phone number, typically submitted through a contact or quote request form.</li>
                                <li>Project details you share with us, including descriptions, files, or requirements related to a potential or ongoing engagement.</li>
                                <li>Technical information such as IP address, browser type, device type, and pages visited, collected automatically through standard website analytics.</li>
                            </ul>
                        </Section>

                        <Section title="3. How We Use Your Information">
                            <p>Information collected is used to:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Respond to inquiries and prepare project quotes or proposals.</li>
                                <li>Communicate with you about an ongoing or prospective project.</li>
                                <li>Deliver contracted development services.</li>
                                <li>Understand website usage and improve its content and performance.</li>
                            </ul>
                            <p>We do not sell your personal information to third parties.</p>
                        </Section>

                        <Section title="4. Cookies & Analytics">
                            <p>
                                This website may use basic cookies and analytics tools to understand how visitors
                                use the site and to improve its performance. These tools may collect anonymized
                                usage data such as page views and general location. You can disable cookies through
                                your browser settings; doing so may affect some site functionality.
                            </p>
                        </Section>

                        <Section title="5. Third-Party Services">
                            <p>
                                We rely on a limited number of trusted third-party services to operate this
                                website and deliver our services — for example, website hosting, analytics, email
                                communication, and payment or invoicing platforms. These providers may process
                                information on our behalf and are expected to safeguard it accordingly.
                            </p>
                            <p>
                                If a project is initiated through a freelance marketplace such as Fiverr or Upwork,
                                that platform's own privacy policy also applies to information handled within it.
                            </p>
                        </Section>

                        <Section title="6. Data Sharing">
                            <p>
                                Your information is not shared with third parties except where necessary to deliver
                                a service you've requested (such as a payment processor), where required by law, or
                                with your explicit consent.
                            </p>
                        </Section>

                        <Section title="7. Data Security">
                            <p>
                                Reasonable technical and organizational measures are used to protect your
                                information. However, no method of transmission or storage over the internet is
                                completely secure, and we cannot guarantee absolute security.
                            </p>
                        </Section>

                        <Section title="8. Data Retention">
                            <p>
                                Information is retained only as long as necessary to respond to your inquiry,
                                fulfil a contracted project, or comply with legal and accounting obligations, after
                                which it is deleted or anonymized.
                            </p>
                        </Section>

                        <Section title="9. Your Rights">
                            <p>
                                You may request access to, correction of, or deletion of your personal information
                                at any time by contacting us at{" "}
                                <a href="mailto:hello@cwmservices.dev" className="text-primary hover:underline">
                                    masood@cwmservices.dev
                                </a>
                            </p>
                        </Section>

                        <Section title="10. Children's Privacy">
                            <p>
                                This website is not directed at children, and we do not knowingly collect
                                information from individuals under the age of 16.
                            </p>
                        </Section>

                        <Section title="11. Changes to This Policy">
                            <p>
                                This Privacy Policy may be updated periodically to reflect changes in our practices
                                or for legal and regulatory reasons. The "Last updated" date at the top of this
                                page reflects the most recent revision.
                            </p>
                        </Section>

                        <Section title="12. Contact">
                            <p>
                                For any questions about this Privacy Policy, please reach out at{" "}
                                <a href="mailto:hello@cwmservices.dev" className="text-primary hover:underline">
                                    masood@cwmservices.dev
                                </a>.
                            </p>
                        </Section>


                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default PrivacyPolicyPage;