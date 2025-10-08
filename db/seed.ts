import { db, Publications } from 'astro:db'

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Publications).values([
    {
      type: 'article',
      doi: '10.1007/s10915-017-0426-7',
      arxiv: '',
      year: 2018,
      title:
        'The Discrete Stochastic Galerkin Method for Hyperbolic Equations with Non-smooth and Random Coefficients',
      author: 'Jin, Shi; Ma, Zheng',
      journal: 'Journal of Scientific Computing',
      journal_abbreviation: 'J Sci Comput',
      pages: '97-121',
      issue: 1,
      volume: 74,
      citekey: 'Jin.Journal of Scientific Computing.2018',
      series: '',
      source_url: '',
      date: '',
      proceedings_title: '',
      conference_name: '',
      tags: 'conventional method',
      status: 'preprint',
    },
    {
      type: 'book_section',
      doi: '10.1007/978-3-030-67104-4_1',
      arxiv: '',
      year: 2021,
      title:
        'Trails in Kinetic Theory, Foundational Aspects and Numerical Methods',
      author: 'Carrillo, José Antonio; Hu, Jingwei; Ma, Zheng; Rey, Thomas',
      journal: '',
      journal_abbreviation: '',
      pages: '1-36',
      citekey: 'Carrillo.SEMA SIMAI Springer Series.2021',
      series: 'SEMA SIMAI Springer Series',
      source_url: '',
      date: '',
      proceedings_title: '',
      conference_name: '',
      tags: 'kinetic equations',
      status: 'published',
    },
  ])
}
