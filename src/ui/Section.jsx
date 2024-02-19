function Section({ children }) {
  return (
    <section className="bg-stone-100 flex flex-row flex-wrap my-2 py-6 px-2">
      {children}
    </section>
  );
}

export default Section;
