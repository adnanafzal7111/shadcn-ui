import { CodeBlock } from '@/components/ui/code-block';

export default function About() {
  const codeSnippet = `const AboutMe = {
  name: "Adnan Afzal",
  title: "Frontend Developer",
  location: "Lahore, Pakistan",
  experience: "~1 year",
  passions: [
    "building beautiful UIs",
    "writing clean code",
    "learning new tech"
  ]
};`;

  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">About Me</h2>
              <div className="h-1 w-20 bg-primary rounded"></div>
            </div>
            
            <div className="space-y-4 text-lg">
              <p>
                I'm a <span className="text-primary font-medium">passionate and detail-focused Frontend Developer</span> with nearly 1 year of experience building scalable and responsive web applications.
              </p>
              <p>
                My specialty is crafting beautiful and usable interfaces with <span className="text-primary font-medium">React, TypeScript, Tailwind CSS, MUI, and Shadcn/UI</span> — and I'm always excited about pushing the limits of modern frontend design.
              </p>
              <p>
                When I'm not coding, I'm constantly exploring new technologies and design trends to stay at the cutting edge of web development.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg blur"></div>
            <div className="relative">
              <CodeBlock 
                language="javascript"
                code={codeSnippet}
                showLineNumbers={true}
                animated={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}