export default function Contact() {
  return (
    <div className="content-wrapper">
      <h1 className="mb-6">Contact</h1>
      
      <div className="card max-w-2xl">
        <h2 className="text-xl mb-4">Get in Touch</h2>
        <p className="mb-4">
          I'd love to hear from you! Whether you have a question, want to collaborate, 
          or just want to say hello, feel free to reach out.
        </p>
        <p>
          <strong>Email:</strong>{' '}
          <a href="mailto:Replytors@gmail.com" className="text-accent">
            Replytors@gmail.com
          </a>
        </p>
      </div>
    </div>
  )
}