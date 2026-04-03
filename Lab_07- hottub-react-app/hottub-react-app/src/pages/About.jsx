import aboutImg from '../assets/About-us.jpg'
import accountImg from '../assets/My-Account.jpg'
import registerImg from '../assets/Register.jpg'

export default function About() {
  return (
    <main>
      <h1>About This Project</h1>
      <p>
        Describe the purpose of the site, your team, and any relevant details here.
      </p>

      <section>
        <h2>Design Reference</h2>
        <p>
          The reference mockups are located in the <code>Final pages</code> folder for guidance.
          Images were removed from the public-facing pages; the focus is on functionality and clean typography.
        </p>

        <img src={aboutImg} alt="About page design reference" />

        <p>Additional images for inspiration:</p>

        <div className="small-gallery">
          <img src={accountImg} alt="My account reference" />
          <img src={registerImg} alt="Register reference" />
        </div>
      </section>
    </main>
  )
}