import Link from 'next/link'
import Button from '../ui/Button'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          WebToolkit Pro
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Free online tools for web developers. Encoders, formatters, validators, 
          converters and code generators.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/tools/">
            <Button variant="primary" className="text-lg px-8 py-4">
              Explore Tools
            </Button>
          </Link>
          <Button variant="secondary" className="text-lg px-8 py-4">
            View GitHub
          </Button>
        </div>
      </div>
    </section>
  )
}