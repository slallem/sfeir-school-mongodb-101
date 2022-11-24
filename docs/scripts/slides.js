import { SfeirThemeInitializer } from '../web_modules/sfeir-school-theme/sfeir-school-theme.mjs';

// One method per module
function introSlides() {
  const directory = '00-intro';
  return [
    `${directory}/00-intro.md`
  ];
}

function speakerSlides() {
  const directory = '10-speakers';
  return [
    `${directory}/10-speaker-hmd.md`,
  ];
}

function conceptsSlides() {
  const directory = '20-concepts';
  return [
    `${directory}/10-concepts.md`,
    `${directory}/20-basics.md`,
    `${directory}/30-collections.md`,
    `${directory}/40-modeling-lab.md`
  ];
}

function toolsSlides() {
  const directory = '30-tools';
  return [
    `${directory}/10-binaries.md`,
    `${directory}/20-gui.md`,
    `${directory}/30-drivers.md`
  ];
}

function crudSlides() {
  const directory = '40-crud';
  return [
    `${directory}/10-intro.md`,
    `${directory}/20-insert.md`,
    `${directory}/30-read.md`,
    `${directory}/40-update.md`,
    `${directory}/50-delete.md`
  ];
}

function indexesSlides() {
  const directory = '50-indexes';
  return [
    `${directory}/10-intro.md`,
    `${directory}/20-creation.md`,
    `${directory}/30-usage.md`,
    `${directory}/40-performance.md`,
    `${directory}/50-covered.md`,
  ];
}

function aggregationSlides() {
  const directory = '60-aggregation';
  return [
    `${directory}/10-concept.md`,
    `${directory}/20-stages.md`,
    `${directory}/30-operators.md`,
    `${directory}/40-lab.md`
  ];
}

function scalingSlides() {
  const directory = '70-scaling';
  return [
    `${directory}/10-intro.md`,
    `${directory}/20-replicaset.md`,
    `${directory}/30-sharding.md`,
  ];
}

function apresSlides() {
  const directory = '90-end';
  return [
    `${directory}/10-questions.md`,
    `${directory}/20-done.md`,
  ];
}

function formation() {
  return [
    //
    ...introSlides(),
    ...speakerSlides(), //
    ...conceptsSlides(), //
    ...toolsSlides(), //
    ...crudSlides(), //
    ...indexesSlides(), //
    ...aggregationSlides(), //
    ...scalingSlides(), //
    ...apresSlides(), //
  ].map((slidePath) => {
    return { path: slidePath };
  });
}

SfeirThemeInitializer.init(formation);
