/*
Shawn O'Brien
22 November, 2021
This script attempts to simulate the DNA behavior of the organism Pila Aequor (See README)
*/

// Returns a random DNA base - Written by Codecademy
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases - Written by Codecademy
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    // Randomly selects and changes a base in dna, then returns dna.
    mutate() {
      const mutated = Math.floor(Math.random()*dna.length);
      const preMutated = dna[mutated];
      do {
        dna[mutated] = returnRandBase();
      } while (dna[mutated] === preMutated);
      return dna;
    },
    // Compares the current pAequor's DNA to the DNA of the pAequor object passed in, then prints the percentage of similarity.
    compareDNA(pAequor) {
      let sameBaseCount = 0;
      for(let i = 0; i < this.dna.length; i++) {
        if(this.dna[i] === pAequor.dna[i]) {
          sameBaseCount++;
        }
      }
      const likeness = Math.round(100*(sameBaseCount / this.dna.length));
      console.log(`Specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${likeness}% DNA in common.`)
    },
    // P.aequor have a likelier chance to survive if their DNA is made up of at least 60% 'C' or 'G' bases.
    // willLikelySurvive checks for that trait and returns true or false appropriately.
    willLikelySurvive() {
      const idealBases = this.dna.filter(base => (base === 'C' || base === 'G'));
      const percentIdeal = Math.floor(100*(idealBases.length / this.dna.length));
      return percentIdeal > 60;
    },
  }
}

// Generating 30 test instances of pAequor that can survive in their natural environment.
let survivingSpecimen = [];
for(let i = 1; i < 31; i++) {
  const dna = mockUpStrand();
  let newSpecimen = pAequorFactory(i, dna);
  while(!newSpecimen.willLikelySurvive()) {
    newSpecimen.dna = mockUpStrand();
  }
  survivingSpecimen.push(newSpecimen);
}

survivingSpecimen.forEach(specimen => {
  console.log(`Specimen #${specimen.specimenNum}:\t
    DNA Strand: [${specimen.dna.join(' ')}]\n\n`)
})