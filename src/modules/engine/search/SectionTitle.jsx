export function SectionTitle({text, children}) {
  console.log(children)
  return <section id="title-wrapper">
    <div className="title">{text}</div>
    <div className="line"></div>

  </section>;
}

SectionTitle.propTypes = {

}
