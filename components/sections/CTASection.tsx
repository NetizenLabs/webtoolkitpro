import Link from '@/components/ui/NativeLink';
import Button from '../ui/Button'

export default function CTASection() {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Boost Your Productivity?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Start using our free tools today and streamline your development workflow
        </p>
        <Link href="/tools/">
          <Button variant="secondary" className="text-lg px-8 py-4">
            Get Started Now
          </Button>
        </Link>
      </div>
    </section>
  )
}