import React from "react";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

export const metadata = {
    title: "Terms & Conditions",
    description:
        "Terms & Conditions for Cwmservices — the terms governing the use of our website and software development services.",
    alternates: {
        canonical: "https://cwmservices.dev/terms-and-conditions",
    }
};

function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
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

function TermsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#0A0B10]">
            <Header />

            <main className="flex-grow py-16 lg:py-20">
                <div className="w-[92%] lg:w-[80%] xl:w-[70%] max-w-[900px] mx-auto">


                    <h1 className="font-display mt-5 text-3xl md:text-4xl lg:text-[42px] font-bold text-ink-dark">
                        Terms & Conditions
                    </h1>

                    <p className="font-body mt-2 text-sm text-ink-dark-muted/70">
                        Last updated: July 16, 2026
                    </p>

                    <div className="mt-10">
                        <Section title="1. Introduction">
                            <p>
                                Welcome to Cwmservices. This website is operated by Masood Ur
                                Rehman, an independent freelance software developer working with
                                a small supporting team. Cwmservices is not currently a
                                registered company and operates as an independent freelance
                                business.
                            </p>

                            <p>
                                By accessing or using this website, you agree to these Terms &
                                Conditions. If you do not agree, please refrain from using the
                                website.
                            </p>
                        </Section>

                        <Section title="2. Services">
                            <p>
                                Cwmservices provides software development, website development,
                                UI/UX implementation, consulting, and related digital services.
                                Any project scope, pricing, timeline, and deliverables are
                                agreed separately with each client before work begins.
                            </p>
                        </Section>

                        <Section title="3. Quotes & Projects">
                            <p>
                                All quotations and estimates are provided in good faith based on
                                the information supplied by the client. Changes to project
                                requirements after work begins may affect pricing, timelines,
                                and deliverables.
                            </p>
                        </Section>

                        <Section title="4. Client Responsibilities">
                            <p>Clients agree to:</p>

                            <ul className="list-disc pl-5 space-y-2">
                                <li>Provide accurate project requirements.</li>
                                <li>Respond to requests for feedback within a reasonable time.</li>
                                <li>Supply any necessary content, assets, or credentials required for the project.</li>
                                <li>Review completed work and communicate requested revisions promptly.</li>
                            </ul>
                        </Section>

                        <Section title="5. Payments">
                            <p>
                                Payment terms are agreed individually for each project. Work may
                                require an upfront payment or milestone-based payments depending
                                on the project's scope.
                            </p>

                            <p>
                                For projects completed through platforms such as Fiverr or
                                Upwork, the payment and dispute policies of those platforms also
                                apply.
                            </p>
                        </Section>

                        <Section title="6. Intellectual Property">
                            <p>
                                Unless otherwise agreed in writing, clients receive ownership of
                                the final deliverables after full payment has been received.
                                Cwmservices may retain the right to showcase completed work as
                                part of its portfolio unless a separate confidentiality agreement
                                states otherwise.
                            </p>
                        </Section>

                        <Section title="7. Website Use">
                            <p>
                                You agree not to misuse this website, attempt unauthorized
                                access, interfere with its operation, or use it for unlawful
                                purposes.
                            </p>
                        </Section>

                        <Section title="8. Limitation of Liability">
                            <p>
                                While reasonable efforts are made to provide reliable services,
                                Cwmservices shall not be liable for indirect, incidental, or
                                consequential damages arising from the use of this website or
                                the services provided.
                            </p>
                        </Section>

                        <Section title="9. Third-Party Services">
                            <p>
                                Projects may involve third-party services such as hosting
                                providers, payment processors, APIs, or other software
                                platforms. Cwmservices is not responsible for downtime, policy
                                changes, or issues originating from third-party providers.
                            </p>
                        </Section>

                        <Section title="10. Changes to These Terms">
                            <p>
                                These Terms & Conditions may be updated from time to time. The
                                latest version will always be available on this page, and the
                                "Last updated" date reflects the most recent revision.
                            </p>
                        </Section>

                        <Section title="11. Contact">
                            <p>
                                For questions regarding these Terms & Conditions, please contact{" "}
                                <a
                                    href="mailto:hello@cwmservices.dev"
                                    className="text-primary hover:underline"
                                >
                                    masood@cwmservices.dev
                                </a>

                            </p>
                        </Section>


                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default TermsPage;