import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Solana Tools</h3>
            <p className="text-sm text-muted-foreground">
              Building the future of decentralized applications on Solana.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/create-token" className="hover:text-primary transition-colors">
                  Create Token
                </a>
              </li>
              <li>
                <a href="/airdrop" className="hover:text-primary transition-colors">
                  Airdrop
                </a>
              </li>
              <li>
                <a href="/liquidity" className="hover:text-primary transition-colors">
                  Liquidity
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://docs.solana.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Solana Docs
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/solana-labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Community</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Solana Tools. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}