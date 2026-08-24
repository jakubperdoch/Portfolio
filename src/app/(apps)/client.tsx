import Hero from "@/components/Home/Hero";
import CaseStudiesScroll, { CaseStudy } from "@/components/Home/CaseStudiesScroll";

const caseStudies: CaseStudy[] = [
  // {
  //   id: 1,
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1785740057479-7d5d8227f089?q=80&w=1421&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // },
  // {
  //   id: 2,
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1785740057479-7d5d8227f089?q=80&w=1421&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // },
  // {
  //   id: 3,
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1785740057479-7d5d8227f089?q=80&w=1421&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // },
  // {
  //   id: 4,
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1785740057479-7d5d8227f089?q=80&w=1421&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // },
  // {
  //   id: 5,
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1785740057479-7d5d8227f089?q=80&w=1421&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // },
];

export default function HomeClient() {
  return (
    <>
      <Hero />
      <CaseStudiesScroll caseStudies={caseStudies} />
      {/* Experience */}
      {/* Knowledge */}
    </>
  );
}
