import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      interest: (form.elements.namedItem("interest") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error ?? "Something went wrong.");
      }

      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    } catch (err) {
      toast({
        title: "Failed to send",
        description: err instanceof Error ? err.message : "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#0a0a0a] relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Info */}
          <div className="lg:w-5/12">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Let's Build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#FF0099]">
                Something Bigger
              </span>
            </h2>
            <p className="text-lg text-foreground/70 mb-12 font-light">
              Whether you're a creator looking for representation or a brand seeking impactful partnerships, we're ready to talk.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#0066FF]" />
                </div>
                <div>
                  <p className="text-sm text-foreground/50 mb-1">Email Us</p>
                  <a href="mailto:userpc0498@gmail.com" className="text-base md:text-lg font-medium text-white hover:text-[#0066FF] transition-colors break-all">
                    userpc0498@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#FF0099]" />
                </div>
                <div>
                  <p className="text-sm text-foreground/50 mb-1">Call Us</p>
                  <a href="tel:8828031506" className="text-lg font-medium text-white hover:text-[#FF0099] transition-colors">
                    +91 88280 31506
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-foreground/50 mb-1">Location</p>
                  <p className="text-lg font-medium text-white">
                    Mumbai, India
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#0066FF]/10 to-[#FF0099]/10 border border-white/5">
              <p className="text-sm font-medium text-white mb-2">Direct Contact:</p>
              <p className="text-lg font-bold">Suraj Saboji</p>
              <p className="text-foreground/60 text-sm">Founder & CEO</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-7/12">
            <div className="bg-[#111111] p-8 md:p-12 rounded-3xl border border-white/5">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground/80">Full Name</label>
                    <Input 
                      id="name" 
                      required 
                      placeholder="John Doe" 
                      className="bg-[#0a0a0a] border-white/10 h-12 focus:border-[#0066FF] transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground/80">Email Address</label>
                    <Input 
                      id="email" 
                      type="email" 
                      required 
                      placeholder="john@example.com" 
                      className="bg-[#0a0a0a] border-white/10 h-12 focus:border-[#0066FF] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="interest" className="text-sm font-medium text-foreground/80">I am a...</label>
                  <select 
                    id="interest" 
                    className="flex h-12 w-full items-center justify-between rounded-md border border-white/10 bg-[#0a0a0a] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent text-white"
                  >
                    <option value="creator">Creator seeking management</option>
                    <option value="brand">Brand seeking partnerships</option>
                    <option value="other">Other inquiry</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground/80">Message</label>
                  <Textarea 
                    id="message" 
                    required 
                    placeholder="Tell us about your goals..." 
                    className="bg-[#0a0a0a] border-white/10 min-h-[150px] resize-none focus:border-[#0066FF] transition-colors"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-14 bg-gradient-to-r from-[#0066FF] to-[#FF0099] text-white font-bold text-lg hover:opacity-90 transition-opacity mt-4 group"
                  data-testid="button-submit-contact"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </Button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
