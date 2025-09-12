import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { MessageCircle, Video, Shield, Users, Zap} from "lucide-react";
import FeatureCard from "@/components/FeatureCard";

export default function Home() {
  return (
    <div className="">
      <Header />

      <main className="flex-1 flex flex-col items-center px-4 py-16 sm:px-6 text-center gap-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-300/10 to-blue-300/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl space-y-8 relative">
          {/* Enhanced gradient background */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50/80 via-indigo-50/60 to-purple-50/80 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-purple-950/30 rounded-3xl blur-3xl scale-150 opacity-60"></div>
          
          <div className="relative">
            {/* Floating sparkles */}

            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 animate-pulse">
              Connect instantly.
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 dark:from-purple-400 dark:via-pink-400 dark:to-rose-400">
                Chat smarter.
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-6">
              The modern messaging platform that combines lightning fast chat and crystal clear video calls in one seamless experience
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
            <SignedOut>
              <SignInButton mode="modal">
                <Button size="lg" className="text-lg px-8 py-6 h-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Start Chatting Free
                </Button>
              </SignInButton>
            </SignedOut>
          </div>

          {/* Enhanced Social Proof */}
          <div className="pt-8">
            <p className="text-sm text-muted-foreground mb-6">
              Trusted by lots of users around the globe
            </p>

            <div className="flex justify-center items-center gap-8 text-muted-foreground">
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-2xl font-bold bg-gradient-to-b from-blue-600 to-blue-700 bg-clip-text text-transparent">1M+</div>
                <div className="text-sm">Active Users</div>
              </div>

              <div className="w-px h-8 bg-gradient-to-b from-transparent via-border to-transparent"></div>
              
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-2xl font-bold bg-gradient-to-b from-purple-600 to-purple-700 bg-clip-text text-transparent">100M+</div>
                <div className="text-sm">Messages Sent</div>
              </div>

              <div className="w-px h-8 bg-gradient-to-b from-transparent via-border to-transparent"></div>
              
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-2xl font-bold bg-gradient-to-b from-green-600 to-green-700 bg-clip-text text-transparent">99.9%</div>
                <div className="text-sm">Uptime</div>
              </div>
            </div>
          </div>

          {/* Enhanced Features Section */}
          <div className="w-full max-w-6xl">
            {/* Enhanced section divider */}
            <div className="w-full flex items-center justify-center mb-16">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
              <div className="px-6">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse shadow-lg"></div>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
            </div>

            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Everything you need to stay connected
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Powerful features designed for seamless communication, whether you are chatting with friends, family, or colleagues.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              <div className="transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                <FeatureCard 
                  icon={MessageCircle}
                  title="Instant Messaging"
                  description="Send and receive messages in real-time with our lightning-fast chat system."
                />
              </div>
              <div className="transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                <FeatureCard 
                  icon={Video}
                  title="Video Calls"
                  description="Crystal clear video calls with just a click. Perfect for both personal and professional use."
                />
              </div>
              <div className="transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                <FeatureCard 
                  icon={Shield}
                  title="Privacy First"
                  description="End-to-end encryption ensures your conversations stay private and secure."
                />
              </div>
              <div className="transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                <FeatureCard 
                  icon={Users}
                  title="Group Chats"
                  description="Create group chats to stay connected with multiple friends or colleagues at once."
                />
              </div>
              <div className="transform hover:scale-105 transition-all duration-300 hover:shadow-xl lg:col-span-1 lg:col-start-2">
                <FeatureCard 
                  icon={Zap}
                  title="Fast Performance"
                  description="Optimized for speed, ensuring smooth and lag-free communication."
                />
              </div>
            </div>
          </div>

          {/* Enhanced CTA Section */}
          <div className="w-full max-w-4xl">
            <div className="rounded-2xl border bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-purple-950/30 p-12 text-center backdrop-blur-sm shadow-2xl relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-2xl"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-400/20 to-transparent rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-tr-full"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Ready to transform your conversations?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of users who have already discovered a better way to communicate. Start your journey with Binatrix today—it's completely free.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <SignedOut>
                    <SignUpButton mode="modal">
                      <Button size="lg" className="text-lg px-8 py-6 h-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        Get Started Free
                      </Button>
                    </SignUpButton>
                  </SignedOut>
                </div>

                <div className="flex justify-center flex-col sm:flex-row items-center gap-6 mt-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 hover:text-green-600 transition-colors duration-300">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    No credit card required
                  </div>
                  <div className="flex items-center gap-2 hover:text-green-600 transition-colors duration-300">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse delay-300"></div>
                    100% free forever
                  </div>
                  <div className="flex items-center gap-2 hover:text-green-600 transition-colors duration-300">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse delay-500"></div>
                    Setup in less than 30 seconds
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t bg-gradient-to-b from-muted/30 to-muted/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Binatrix
              </span>
              <p className="text-sm text-muted-foreground mt-1">The future of communication</p>
            </div>

            <div className="flex items-center gap-8">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-blue-600 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-blue-600 transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-blue-600 transition-colors duration-300"
              >
                Support
              </a>
            </div>
          </div>

          <div className="border-t mt-8 pt-6 text-center">
            <span className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Binatrix. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}