import React from 'react';
import { Microscope, FlaskConical, Zap, Calculator, Sprout, Languages } from 'lucide-react';

export const SUBJECTS = [
  { name: 'Biology',     progress: 70, icon: <Microscope size={20} />,     },
  { name: 'Chemistry',   progress: 55, icon: <FlaskConical size={20} />,    },
  { name: 'Physics',     progress: 65, icon: <Zap size={20} />,           },
  { name: 'Mathematics', progress: 85, icon: <Calculator size={20} />,     },
  { name: 'Agriculture', progress: 40, icon: <Sprout size={20} />,          },
  { name: 'English',     progress: 75, icon: <Languages size={20} />,     },
];

export const TOPICS_DATA = {
  Mathematics: {
    'Form 1': ['Number Systems', 'Algebraic Expressions', 'Linear Equations', 'Angles and Polygons', 'Statistics'],
    'Form 2': ['Pythagoras Theorem', 'Similar Triangles', 'Mensuration', 'Quadratic Equations'],
    'Form 3': ['Quadratic Equations', 'Circle Geometry', 'Trigonometry', 'Coordinate Geometry'],
    'Form 4': ['Matrices', 'Vectors', 'Linear Programming', 'Probability'],
  },
  Physics: {
    'Form 1': ['Force', 'Energy', 'Electric Current', 'Magnets'],
    'Form 2': ['Density', 'Thermal Expansion', 'Light', 'Machines'],
    'Form 3': ['Pressure', 'Gas Laws', 'Linear Motion', 'Sound Waves'],
    'Form 4': ["Newton's Laws of Motion", 'Hooke\'s Law', 'Electromagnetism', 'Radioactivity'],
  },
  Biology: {
    'Form 1': ['Characteristics of Living Things', 'Classification', 'The Cell', 'Nutrition in Plants'],
    'Form 2': ['Photosynthesis', 'Transport in Plants', 'Digestive System', 'Micro-organisms'],
    'Form 3': ['Circulatory System', 'Respiratory System', 'Nervous System', 'Reproduction'],
    'Form 4': ['Variation', 'Natural Selection', 'Biotechnology', 'Immunity'],
  },
  English: {
    'Form 1': ['Central Idea', 'Fact vs Fiction', 'Nouns and Pronouns', 'Sentence Structure'],
    'Form 2': ['Fact and Opinion', 'Verbs and Tenses', 'Adjectives', 'Letter Writing'],
    'Form 3': ['Literary Devices', 'Essay Writing', 'Public Speaking', 'Comprehension'],
    'Form 4': ['Critical Thinking', 'Academic Writing', 'Poetry Analysis', 'Exam Techniques'],
  },
  Chemistry: {
    'Form 1': ['Atomic Structure', 'Periodic Table', 'Chemical Bonding', 'Chemical Changes'],
    'Form 2': ['Acids and Bases', 'Hydrocarbons', 'Air Composition', 'Soil Chemistry'],
    'Form 3': ['Stoichiometry', 'Nitrogen', 'Alkanols', 'Heats of Reaction'],
    'Form 4': ['Rates of Reaction', 'Redox Reactions', 'Electrolysis', 'Polymerisation'],
  },
  Agriculture: {
    'Form 1': ['Natural Resources', 'Plant Nutrients', 'Vegetable Production', 'Classes of Livestock'],
    'Form 2': ['Soil Fertility', 'Irrigation', 'Maize Production', 'Pig Production'],
    'Form 3': ['Soil Properties', 'Farm Records', 'Cropping Systems', 'Feeds and Feeding'],
    'Form 4': ['Soil Degradation', 'Farm Mechanization', 'Crop Improvement', 'Cattle Production'],
  },
};

export const MOCK_LESSONS = {
  // ========== MATHEMATICS ==========
  'Number Systems': {
    title: 'Number Systems',
    learningObjectives: [
      'Identify natural numbers, whole numbers, and integers',
      'Represent numbers on a number line',
      'Perform basic operations with directed numbers',
      'Apply number concepts to real-life situations'
    ],
    introduction: 'Good day, young mathematician! Have you ever counted your money, measured your height, or told the time? You were using numbers! Numbers are everywhere around us. Today, I will take you on a journey to discover the different families of numbers and how they help us understand our world.',
    detailedContent: `Let me explain the different types of numbers using examples you see every day.

NATURAL NUMBERS are the numbers you use when you count. When you say "I have 5 mangoes" or "There are 10 learners in my class," you are using natural numbers. They start from 1 and go upwards: 1, 2, 3, 4, 5...

WHOLE NUMBERS are just like natural numbers, but they also include ZERO. Zero is special because it represents "nothing". If you have no money in your pocket, you have zero kwacha.

INTEGERS include both positive numbers and negative numbers, plus zero. Negative numbers represent things that are below zero. For example, if the temperature drops below freezing, we say it is -5 degrees Celsius. If you owe someone money, that is like having negative money!

A NUMBER LINE is like a ruler that goes in both directions. Zero is in the middle. Positive numbers go to the right, negative numbers go to the left. The further right you go, the larger the number. The further left you go, the smaller the number.

Let me give you a practical example from Malawi. Imagine you have 500 kwacha (that is +500). If you spend 200 kwacha on exercise books, you have 300 kwacha left (+300). If instead you borrowed 200 kwacha from a friend, you would have a debt of 200 kwacha, which we could represent as -200!`,
    summary: 'Numbers help us count, measure, and describe our world. Natural numbers are for counting (1,2,3...). Whole numbers include zero (0,1,2,3...). Integers include negative numbers (...-2,-1,0,1,2...). A number line helps us see the order and relationship between numbers.',
    estimatedTime: '20 mins'
  },
  'Algebraic Expressions': {
    title: 'Algebraic Expressions',
    learningObjectives: [
      'Identify coefficients, like terms, and unlike terms',
      'Add and subtract algebraic expressions',
      'Multiply and divide algebraic terms',
      'Substitute values into algebraic expressions'
    ],
    introduction: 'Hello, algebra explorer! Have you ever seen letters mixed with numbers in mathematics and wondered what they mean? That is ALGEBRA! Algebra is like a secret code where letters stand for unknown numbers. Today, I will teach you how to read and write this code.',
    detailedContent: `Imagine you are at a market in Lilongwe. You want to buy apples and oranges. You don't know the price yet, so you say: "Let a = price of one apple" and "Let o = price of one orange". This is algebra! We use letters to represent unknown quantities.

In algebra, we write expressions like 5x + 3y - 2x + 4y. The letters x and y are VARIABLES - they can stand for different numbers. The numbers in front (5, 3, 2, 4) are COEFFICIENTS - they tell us how many of each variable we have.

Now, here is an important rule: You can only add or subtract LIKE TERMS. Like terms have the SAME variable. So 5x and 2x are like terms because they both have x. But 5x and 3y are NOT like terms because they have different variables.

Let me show you how to simplify: 5x + 3y - 2x + 4y

First, group the like terms: (5x - 2x) + (3y + 4y)

Then add the coefficients: (5 - 2)x + (3 + 4)y = 3x + 7y

That is it! You have simplified the expression.

When we know the actual value of the variable, we can SUBSTITUTE. For example, if x = 2 and y = 3, then:
3x + 7y = 3(2) + 7(3) = 6 + 21 = 27`,
    summary: 'Algebra uses letters (variables) to represent unknown numbers. Coefficients are the numbers multiplied by variables. Like terms have the same variable and can be added or subtracted. Substitution means replacing variables with actual numbers to find the value of an expression.',
    estimatedTime: '22 mins'
  },
  'Linear Equations': {
    title: 'Linear Equations',
    learningObjectives: [
      'Define a linear equation in one variable',
      'Solve linear equations using inverse operations',
      'Formulate linear equations from word problems',
      'Apply linear equations to real-life situations'
    ],
    introduction: 'Welcome, problem solver! Have you ever needed to find an unknown number and had to do some detective work? That is exactly what solving equations is about! An equation is like a balanced scale - whatever you do to one side, you must do to the other.',
    detailedContent: `Think of an equation as a balanced scale. The equal sign (=) is like the balance point. If the scale is balanced, the left side weighs the same as the right side. If you add weight to one side, you must add the same weight to the other side to keep it balanced.

Let me show you how to solve a simple equation: x + 5 = 12

What does this mean? Some number (x) plus 5 equals 12. We need to find x.

To get x by itself, we need to remove the +5. The inverse operation of addition is subtraction. So we subtract 5 from BOTH sides:

x + 5 - 5 = 12 - 5
x = 7

Check: Does 7 + 5 = 12? Yes! So x = 7 is correct.

Now try: 3x = 18

Here, 3 is multiplied by x. The inverse of multiplication is division. Divide both sides by 3:

3x ÷ 3 = 18 ÷ 3
x = 6

Check: 3 × 6 = 18. Correct!

Now a harder one: 2x - 3 = 11

Step 1: Add 3 to both sides (undo subtraction):
2x - 3 + 3 = 11 + 3
2x = 14

Step 2: Divide both sides by 2 (undo multiplication):
2x ÷ 2 = 14 ÷ 2
x = 7

Check: 2(7) - 3 = 14 - 3 = 11. Correct!`,
    summary: 'Linear equations have the form ax + b = c. To solve, isolate the variable using inverse operations (addition/subtraction, multiplication/division). Always perform the same operation on both sides to keep the equation balanced.',
    estimatedTime: '25 mins'
  },
  'Quadratic Equations': {
    title: 'Quadratic Equations',
    learningObjectives: [
      'Identify quadratic equations in standard form',
      'Solve quadratic equations by factorization',
      'Solve quadratic equations by completing the square',
      'Apply the quadratic formula to find solutions'
    ],
    introduction: 'Hello, equation solver! You have already learned to solve linear equations like x + 5 = 12. Now we are going to take a step up to QUADRATIC equations - where the variable is squared. These equations may seem harder, but they are actually more powerful.',
    detailedContent: `Let me explain what makes a QUADRATIC equation special. The highest power of x is 2 - that is why it is called "quadratic" (from the Latin word for square).

The standard form is: ax² + bx + c = 0, where a, b, and c are numbers, and a cannot be zero.

Let me teach you the QUADRATIC FORMULA method (always works!):

The formula is: x = [-b ± √(b² - 4ac)] / 2a

Solve 2x² - 5x - 3 = 0
Here a = 2, b = -5, c = -3

x = [5 ± √((-5)² - 4×2×(-3))] / (2×2)
x = [5 ± √(25 + 24)] / 4
x = [5 ± √49] / 4
x = [5 ± 7] / 4

So: x = (5 + 7)/4 = 12/4 = 3
or x = (5 - 7)/4 = -2/4 = -0.5

Now, why do we need quadratic equations? Here is a real example from Malawi.

A farmer wants to fence a rectangular garden. The garden is 5 metres longer than it is wide, and the area is 84 square metres. What are the dimensions?

Let width = w, then length = w + 5
Area = w × (w + 5) = 84
w² + 5w - 84 = 0

Solve: (w + 12)(w - 7) = 0
w = -12 (not possible, width cannot be negative) or w = 7
So width = 7 m, length = 12 m`,
    summary: 'Quadratic equations have the form ax² + bx + c = 0. They can be solved by factorization, completing the square, or the quadratic formula. Quadratic equations help solve real-world problems involving area and motion.',
    estimatedTime: '28 mins'
  },

  // ========== PHYSICS ==========
  'Force': {
    title: 'Force',
    learningObjectives: [
      'Define force and state its SI unit',
      'Identify different types of forces',
      'Describe the effects of forces on objects',
      'Measure force using a spring balance'
    ],
    introduction: 'Hello, physics explorer! Have you ever pushed a door to open it? Kicked a football? Pulled a rope? You have been using FORCE! Force is a push or a pull that can change the way an object moves.',
    detailedContent: `Let me start by defining FORCE. A force is any push or pull that can make an object:
- Start moving (if it was still)
- Stop moving (if it was moving)
- Speed up or slow down
- Change direction
- Change shape

For example, when you kick a football, your foot applies a force that makes the ball move. When a goalkeeper catches the ball, their hands apply a force that stops the ball.

We measure force in NEWTONS (N), named after Sir Isaac Newton, the scientist who discovered the laws of motion.

Let me describe the different types of forces:

CONTACT FORCES: These forces act when objects touch each other.
- Pushing a trolley
- Pulling a rope
- Friction (the force that opposes motion when surfaces rub together)

NON-CONTACT FORCES: These forces act even when objects are not touching.
- GRAVITY: The force that pulls objects towards the Earth
- MAGNETIC FORCE: The force that attracts iron objects to a magnet
- ELECTROSTATIC FORCE: The force between electrically charged objects

WEIGHT is a special force. Weight is the force of gravity pulling an object downwards. Weight is different from MASS. Mass is how much matter is in an object (measured in kilograms). Weight depends on gravity. On Earth, a 1 kg mass weighs about 9.8 N. On the moon, the same 1 kg mass weighs only about 1.6 N because the moon's gravity is weaker.`,
    summary: 'Force is a push or pull measured in Newtons (N). Forces can be contact or non-contact (gravity, magnetism). Forces change an object\'s speed, direction, or shape. Weight is the force of gravity on an object.',
    estimatedTime: '22 mins'
  },
  'Energy': {
    title: 'Energy',
    learningObjectives: [
      'Define energy and state its SI unit',
      'Identify different forms of energy',
      'Describe energy transfers and transformations',
      'State and apply the law of conservation of energy'
    ],
    introduction: 'Good day, energy explorer! Energy is everywhere - in the food you eat, in the fuel that powers cars, in the sunlight that warms your skin. Without energy, nothing would happen.',
    detailedContent: `Let me help you understand ENERGY. Energy is the ability to do WORK or cause CHANGE. When you have energy, you can make things happen.

Here is the most important law about energy: THE LAW OF CONSERVATION OF ENERGY.

This law states: ENERGY CANNOT BE CREATED OR DESTROYED. IT CAN ONLY BE TRANSFORMED FROM ONE FORM TO ANOTHER.

Let me explain the different FORMS OF ENERGY:

1. KINETIC ENERGY: The energy of motion. A moving bicycle, a running person, a flowing river - all have kinetic energy.

2. POTENTIAL ENERGY: Stored energy waiting to be used. A ball on a high shelf has gravitational potential energy.

3. THERMAL (HEAT) ENERGY: Energy from the movement of particles.

4. CHEMICAL ENERGY: Energy stored in chemical bonds. Food, batteries, and fuel contain chemical energy.

5. ELECTRICAL ENERGY: Energy from the flow of electrons.

6. LIGHT ENERGY: Energy from electromagnetic waves.

7. SOUND ENERGY: Energy from vibrations.

Let me show you ENERGY TRANSFORMATIONS:

When you eat nsima (chemical energy), your body converts it into kinetic energy (so you can walk) and thermal energy (to keep your body warm).

At a hydroelectric dam, water held behind the dam has gravitational potential energy. When the water falls, this becomes kinetic energy. The falling water spins turbines, converting kinetic energy into electrical energy.`,
    summary: 'Energy is the ability to do work, measured in joules (J). Forms include kinetic, potential, thermal, chemical, electrical, light, and sound. The law of conservation of energy states energy cannot be created or destroyed, only transformed.',
    estimatedTime: '23 mins'
  },
  'Pressure': {
    title: 'Pressure',
    learningObjectives: [
      'Define pressure and state its SI units',
      'Calculate pressure exerted by solids',
      'Explain factors affecting pressure in liquids',
      'Apply the formula p = ρgh to solve problems'
    ],
    introduction: 'Hello, science explorer! Have you ever wondered why a sharp knife cuts more easily than a blunt one? Or why a tractor has wide tyres while a racing bicycle has thin ones? The answer lies in a concept called PRESSURE.',
    detailedContent: `Let me explain pressure using a simple example. Imagine you are holding a book. The weight (force) of the book is spread over the area of your hand. That force per unit area is what we call PRESSURE.

Now, if you hold the same book but balance it on just one finger, what happens? The same force is now concentrated on a much smaller area. So the pressure increases dramatically! That is why a sharp knife cuts easily - the force from your hand is concentrated on a very thin edge.

The formula for pressure is: P = F / A
Where P is pressure, F is force (in Newtons), and A is area (in square metres).

Now, let us talk about pressure in liquids. When you dive into a swimming pool, you feel pressure in your ears. That pressure increases as you go deeper. The formula for liquid pressure is: P = ρgh
Where ρ (rho) is the density of the liquid (in kg/m³), g is acceleration due to gravity (9.8 m/s²), and h is the depth (in metres).

Let me show you an example. Calculate the pressure at the bottom of a lake that is 5 metres deep. The density of water is 1000 kg/m³.
P = 1000 × 9.8 × 5 = 49,000 Pa (or 49 kPa)

Think about dams. They are built wider at the bottom because the pressure increases with depth. The bottom of the dam experiences much higher pressure than the top, so it needs to be stronger.`,
    summary: 'Pressure is force per unit area (P = F/A). For solids, pressure increases when area decreases. For liquids, pressure increases with depth and density according to P = ρgh.',
    estimatedTime: '22 mins'
  },

  // ========== BIOLOGY ==========
  'Characteristics of Living Things': {
    title: 'Characteristics of Living Things',
    learningObjectives: [
      'List the seven characteristics of living things',
      'Explain each characteristic with examples',
      'Distinguish between living and non-living things',
      'Apply the characteristics to identify living organisms'
    ],
    introduction: 'Good day, young biologist! Look around you. The dog barking, the maize plant growing, the bird flying - they are all alive. But what makes something alive? Today, I will teach you the seven characteristics that all living things share.',
    detailedContent: `Let me introduce you to the seven characteristics of living things. Biologists use the acronym "MRS GREN" to remember them:

M - MOVEMENT: Living things can move. Animals move from place to place. Plants move too, but more slowly - they grow towards sunlight.

R - RESPIRATION: This is NOT the same as breathing! Respiration is the chemical process that releases energy from food.

S - SENSITIVITY: Living things can detect and respond to changes in their environment.

G - GROWTH: Living things grow and develop. A baby grows into an adult. A seed grows into a maize plant.

R - REPRODUCTION: Living things produce offspring. This ensures that species continue.

E - EXCRETION: Living things remove waste products from their bodies.

N - NUTRITION: Living things need food. Animals eat other organisms. Plants make their own food through photosynthesis.

Let me test you. Is a car alive? A car moves, but it does not grow, reproduce, excrete, or need nutrition. So a car is NOT alive.

Is a seed alive? A seed is a dormant living thing. It does not move much, but it respires, it can grow when conditions are right, and it can reproduce. So yes, seeds are alive!`,
    summary: 'All living things share seven characteristics: Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, and Nutrition (MRS GREN). These characteristics distinguish living from non-living things.',
    estimatedTime: '20 mins'
  },
  'The Cell': {
    title: 'The Cell',
    learningObjectives: [
      'Describe the cell as the basic unit of life',
      'Identify the parts of a typical animal and plant cell',
      'State the functions of cell organelles',
      'Distinguish between plant and animal cells'
    ],
    introduction: 'Hello, curious learner! Did you know that your body is made up of trillions of tiny building blocks? These building blocks are called CELLS. Every living thing is made of cells. Today, I will take you inside these amazing microscopic structures.',
    detailedContent: `Imagine a busy city. The city has different buildings: houses for living, factories for making products, power stations for energy, and roads for transportation. A cell is like a tiny city! It has different parts called ORGANELLES, each with its own job.

Let me introduce you to the main parts of a cell:

First, the CELL MEMBRANE. This is like a security gate. It surrounds the cell and controls what enters and leaves.

Next, the NUCLEUS. This is the control centre - the "brain" of the cell. It contains DNA, which carries all the instructions for the cell's activities.

The CYTOPLASM is the jelly-like substance filling the cell. All the organelles float in it.

MITOCHONDRIA are the powerhouses. They break down food to release energy that the cell uses for all its activities.

RIBOSOMES are the factories that make proteins.

Now, here is the difference between plant and animal cells. Plant cells have three extra parts:
- CELL WALL: A rigid outer layer that gives the plant cell shape and support
- CHLOROPLASTS: These contain chlorophyll and carry out photosynthesis
- LARGE VACUOLE: A storage sac that holds water and nutrients

Animal cells do not have these structures. That is why animals have skeletons for support - we do not have cell walls!`,
    summary: 'The cell is the basic unit of life. Cells contain organelles including the nucleus (control centre), mitochondria (powerhouses), and ribosomes (protein factories). Plant cells have a cell wall, chloroplasts, and a large vacuole that animal cells lack.',
    estimatedTime: '24 mins'
  },
  'Photosynthesis': {
    title: 'Photosynthesis',
    learningObjectives: [
      'Define photosynthesis and state its equations',
      'Identify the raw materials and products of photosynthesis',
      'Explain the conditions necessary for photosynthesis',
      'Describe the importance of photosynthesis to life on Earth'
    ],
    introduction: 'Hello, nature enthusiast! Have you ever wondered how plants get their food? Unlike animals that eat other organisms, plants make their own food using just sunlight, water, and air. This incredible process is called PHOTOSYNTHESIS.',
    detailedContent: `Let me explain photosynthesis step by step. Imagine you are a leaf on a tree. You have tiny structures called CHLOROPLASTS inside your cells. Inside these chloroplasts is a green pigment called CHLOROPHYLL. This chlorophyll captures energy from sunlight.

Now, the leaf also has tiny openings called STOMATA. Through these openings, carbon dioxide from the air enters the leaf. Meanwhile, water is absorbed from the soil by the roots and travels up to the leaves.

Inside the chloroplasts, something magical happens. The captured sunlight energy is used to combine carbon dioxide (CO₂) and water (H₂O) to produce GLUCOSE (C₆H₁₂O₆) - which is a sugar that the plant uses for energy - and OXYGEN (O₂), which is released into the air.

Here is the word equation you should memorise:
CARBON DIOXIDE + WATER → GLUCOSE + OXYGEN
(in the presence of sunlight and chlorophyll)

Here is the chemical equation:
6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂

What conditions are needed? You need all of these:
- SUNLIGHT (the energy source)
- CHLOROPHYLL (to capture the sunlight)
- CARBON DIOXIDE (from the air)
- WATER (from the soil)
- SUITABLE TEMPERATURE

The importance of photosynthesis cannot be overstated. It produces the oxygen we breathe. It is the starting point of almost every food chain. Without photosynthesis, there would be no life on Earth as we know it.`,
    summary: 'Photosynthesis is the process where green plants use sunlight, carbon dioxide, and water to produce glucose and oxygen. The equation is 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. Photosynthesis is essential because it provides oxygen, food, and removes carbon dioxide from the atmosphere.',
    estimatedTime: '22 mins'
  },

  // ========== CHEMISTRY ==========
  'Atomic Structure': {
    title: 'Atomic Structure',
    learningObjectives: [
      'Describe the structure of an atom',
      'State the charges and relative masses of subatomic particles',
      'Use atomic number and mass number to determine proton, neutron, and electron numbers',
      'Explain what isotopes are'
    ],
    introduction: 'Greetings, future chemist! Have you ever looked at a grain of sand and wondered what it is made of? Everything around us is made of tiny particles called ATOMS. Today, I will take you inside the atom to discover its secrets.',
    detailedContent: `Let me paint a picture for you. Imagine the atom as a tiny solar system. At the centre is the NUCLEUS - this is like the sun. Orbiting around the nucleus are ELECTRONS - these are like planets circling the sun.

Now, what is inside the nucleus? The nucleus contains two types of particles:
- PROTONS: These have a POSITIVE charge (+1)
- NEUTRONS: These have NO charge (neutral)

The electrons that orbit around the nucleus have a NEGATIVE charge (-1).

Here is something fascinating: Most of the atom is actually EMPTY SPACE! If an atom were the size of a football stadium, the nucleus would be the size of a pea at the centre.

Now, let me introduce two important numbers:

ATOMIC NUMBER (Z): This is the number of PROTONS in an atom. This number identifies the element. Every carbon atom has 6 protons, every oxygen atom has 8 protons.

MASS NUMBER (A): This is the number of PROTONS + NEUTRONS in an atom.

In a neutral atom, the number of ELECTRONS equals the number of PROTONS.

Now, what are ISOTOPES? Isotopes are atoms of the SAME element (same number of protons) but with DIFFERENT numbers of neutrons. For example:
- Carbon-12 has 6 protons and 6 neutrons
- Carbon-14 has 6 protons and 8 neutrons

Both are carbon, but they have different masses. Carbon-14 is radioactive and is used in carbon dating to determine the age of ancient artefacts!`,
    summary: 'An atom consists of a nucleus (containing protons and neutrons) surrounded by orbiting electrons. Protons are positive, neutrons are neutral, and electrons are negative. The atomic number equals the number of protons. Isotopes are atoms of the same element with different numbers of neutrons.',
    estimatedTime: '23 mins'
  },
  'Acids and Bases': {
    title: 'Acids and Bases',
    learningObjectives: [
      'Describe the properties of acids and bases',
      'Identify common acids and bases found at home',
      'Explain the pH scale',
      'Describe neutralisation reactions'
    ],
    introduction: 'Hello, chemistry explorer! Have you ever tasted a lemon and felt your mouth pucker? Or touched soap and felt a slippery sensation? You have experienced acids and bases! Today, I will help you understand what makes something an acid or a base.',
    detailedContent: `Let me start by helping you understand what ACIDS are. When you eat a lemon or tamarind, you taste sourness. That sourness comes from acids. Lemons contain CITRIC ACID, vinegar contains ACETIC ACID, and your stomach contains HYDROCHLORIC ACID.

Here are the key properties of acids:
- They taste sour
- They turn blue litmus paper red
- They react with metals like magnesium to produce hydrogen gas

Now, what about BASES? Bases are the opposite of acids. Soap, baking soda, and household ammonia are examples of bases.

Properties of bases:
- They taste bitter
- They turn red litmus paper blue
- They feel slippery

The pH SCALE measures how acidic or basic a solution is from 0 to 14:
- pH 0-6: ACIDIC
- pH 7: NEUTRAL (pure water)
- pH 8-14: BASIC

Here are common pH values:
- Stomach acid: pH 1-2
- Lemon juice: pH 2-3
- Vinegar: pH 3
- Pure water: pH 7
- Baking soda: pH 8-9
- Soap: pH 9-10

Now, NEUTRALISATION. When an acid and a base react together, they cancel each other's properties. The products are always a SALT and WATER.

Acid + Base → Salt + Water

For example: Hydrochloric acid + Sodium hydroxide → Sodium chloride (table salt) + Water

Why is this important? If you have an upset stomach from too much acid, you take an antacid (a base) to neutralise the excess acid. Farmers add lime (a base) to acidic soil to make it suitable for crops.`,
    summary: 'Acids taste sour and turn blue litmus red. Bases taste bitter, feel slippery, and turn red litmus blue. The pH scale (0-14) measures acidity and basicity. Neutralisation occurs when an acid reacts with a base to form a salt and water.',
    estimatedTime: '20 mins'
  },

  // ========== AGRICULTURE ==========
  'Natural Resources': {
    title: 'Natural Resources',
    learningObjectives: [
      'Identify natural resources that influence agricultural production',
      'Explain the importance of each natural resource to agriculture',
      'Describe ways in which natural resources can be depleted',
      'Discuss methods of conserving natural resources'
    ],
    introduction: 'Hello, future farmer! Have you ever thought about what makes crops grow well in some places and poorly in others? The answer lies in NATURAL RESOURCES - the gifts of nature that help farmers produce food.',
    detailedContent: `Let me introduce you to the five natural resources that every farmer depends on.

First, SOIL. Without soil, most crops cannot grow. Soil provides:
- ANCHORAGE: Roots hold the plant in place
- WATER: Soil stores water that roots absorb
- NUTRIENTS: Soil contains minerals that plants need
- AIR: Spaces in soil allow oxygen to reach roots

Second, WATER. A single maize plant can use up to 3 litres of water per day during the growing season! Water is needed for germination, transport of nutrients, and photosynthesis.

Third, SUNLIGHT. Plants capture sunlight energy to make their food through photosynthesis. Without adequate sunlight, plants become weak and produce poor yields.

Fourth, AIR. Plants need carbon dioxide for photosynthesis and oxygen for respiration.

Fifth, VEGETATION. Trees and other plants prevent soil erosion, add organic matter to soil, and influence rainfall patterns.

Now, these resources can be DEPLETED through:
- Soil depletion: Continuous cropping without adding nutrients
- Water depletion: Over-irrigation and pollution
- Vegetation loss: Clearing forests without replanting

How can we CONSERVE these resources?
- SOIL CONSERVATION: Contour ploughing, terracing, mulching, crop rotation
- WATER CONSERVATION: Rainwater harvesting, drip irrigation, mulching
- VEGETATION CONSERVATION: Planting trees, protecting forests`,
    summary: 'Soil, water, sunlight, air, and vegetation are the five natural resources that influence agriculture. These resources can be depleted through poor farming practices. Conservation methods include contour ploughing, mulching, crop rotation, water harvesting, and tree planting.',
    estimatedTime: '21 mins'
  },
  'Soil Fertility': {
    title: 'Soil Fertility',
    learningObjectives: [
      'Distinguish between fertile and infertile soils',
      'Describe ways of maintaining soil fertility',
      'Classify fertilizers into organic and inorganic types',
      'Discuss the advantages and disadvantages of each fertilizer type'
    ],
    introduction: 'Good day, young agriculturist! Some soils are naturally rich in nutrients - we call these FERTILE soils. Others are poor - INFERTILE soils. Today, I will teach you how to maintain soil fertility and add nutrients back to the soil.',
    detailedContent: `Let me help you understand what makes soil FERTILE. A fertile soil has three important qualities:
1. It contains all the essential plant nutrients
2. It has good structure for roots and water
3. It can hold enough water for plants

An INFERTILE soil produces stunted, yellow plants with very little food.

How to MAINTAIN soil fertility:

First, CROP ROTATION - growing different crops in a field each season. After growing maize (which uses lots of nitrogen), plant groundnuts (which add nitrogen back to the soil).

Second, FALLOWING - leaving the field empty for a season to allow the soil to rest.

Third, ADDING ORGANIC MATTER - compost, manure, or crop residues.

Fourth, USING FERTILIZERS.

ORGANIC FERTILIZERS (manure, compost):
Advantages: Improve soil structure, release nutrients slowly, inexpensive
Disadvantages: Low nutrient concentration, can contain weed seeds

INORGANIC FERTILIZERS (Urea, Compound D):
Advantages: High nutrient concentration, nutrients immediately available, easy to apply
Disadvantages: Expensive, can burn plants if over-applied, do not improve soil structure

The best approach is to use BOTH! Use organic matter to improve soil health, and supplement with inorganic fertilizers when plants need specific nutrients.`,
    summary: 'Fertile soil contains adequate nutrients and supports healthy plant growth. Soil fertility can be maintained through crop rotation, fallowing, adding organic matter, and using fertilizers. Organic fertilizers improve soil structure; inorganic fertilizers provide concentrated nutrients.',
    estimatedTime: '20 mins'
  },

  // ========== ENGLISH ==========
  'Central Idea': {
    title: 'Finding the Central Idea',
    learningObjectives: [
      'Define the central idea of a text',
      'Identify the central idea from the title, beginning, or end',
      'Distinguish between the central idea and supporting details',
      'State the central idea of a given passage in your own words'
    ],
    introduction: 'Hello, reader! Have you ever finished reading a story and someone asked you, "What was it about?" You probably gave a one-sentence answer. That sentence is the CENTRAL IDEA. Today, I will teach you how to find the main point an author is trying to communicate.',
    detailedContent: `Let me explain what the CENTRAL IDEA is. Imagine telling a friend about a movie you watched. You do not tell them every single thing that happened. Instead, you say, "It was about a young boy who discovers he is a wizard." That one sentence captures the MAIN IDEA.

Where can you find the central idea?

First, check the TITLE. A title like "Why Exercise is Good for Your Health" tells you exactly what the text will be about.

Second, read the FIRST PARAGRAPH. Many authors state their main point right at the beginning.

Third, read the LAST PARAGRAPH. Some authors build up to their main point, saving it for the end.

Let me give you an example:

"Water is essential for life on Earth. Plants need water to grow. Animals need water to drink. Humans can survive only a few days without water. Clearly, without water, life would not exist."

The central idea is "Water is essential for life on Earth." The first sentence stated it, and the rest provided SUPPORTING DETAILS.

Here is a common mistake: confusing the CENTRAL IDEA with the TOPIC. The topic is one or two words, like "pollution". The central idea is a COMPLETE SENTENCE, like "Pollution is harmful to ocean life."

Now it is your turn. When you read any text, ask yourself: "What is the ONE main thing the author wants me to understand?" That is your central idea.`,
    summary: 'The central idea is the main point an author wants to communicate, expressed as a complete sentence. It can often be found in the title, first paragraph, or last paragraph. Supporting details are facts and examples that explain or prove the central idea.',
    estimatedTime: '18 mins'
  },
  'Fact vs Fiction': {
    title: 'Fact vs Fiction',
    learningObjectives: [
      'Define fact and fiction',
      'Identify statements of fact in a text',
      'Identify statements of fiction in a text',
      'Distinguish between factual and fictional descriptions'
    ],
    introduction: 'Hello, critical thinker! Every day, we are bombarded with information from books, social media, and news. Some information is TRUE (facts), and some is MADE UP (fiction). Being able to tell the difference is one of the most important skills you can learn.',
    detailedContent: `Let me start by defining what a FACT is. A fact is a statement that can be PROVEN to be true. How do we prove it? We can:
- OBSERVE it directly (like "the sky is blue today")
- MEASURE it (like "this desk is 1.2 metres long")
- CHECK reliable sources (like "Lilongwe is the capital of Malawi")
- CONDUCT experiments (like "water boils at 100°C")

Facts are objective. They are true regardless of what anyone thinks or feels.

Now, what is FICTION? Fiction is something that is invented or imagined. When an author writes a story about a boy who can fly, that is fiction.

Here are examples:

FACTS:
- "Malawi became independent in 1964"
- "The human body has 206 bones"
- "Maize is the main staple food in Malawi"

FICTION:
- "Ananse the spider tricked the other animals" (folktale)
- "Harry Potter flew on a broomstick" (novel)
- "Once upon a time, there was a princess" (fairy tale)

Here is where it gets tricky. Some things that SOUND like facts might actually be OPINIONS:
- "Chicken is the most delicious meat" (OPINION - not everyone agrees)

Why is this important? For MEDIA LITERACY - news and social media sometimes mix facts with fiction. For ACADEMIC SUCCESS - your teachers expect you to use facts as evidence. For DECISION MAKING - our choices should be based on facts, not fiction.

When you read or hear something, always ask: "Can this be proven? Is there evidence? Or is this someone's imagination or opinion?"`,
    summary: 'A fact is a statement that can be proven true through evidence. Fiction is invented or imagined. Facts are objective and verifiable; fiction includes stories and imaginative writing. Distinguishing fact from fiction is essential for media literacy, academic success, and good decision-making.',
    estimatedTime: '16 mins'
  }
};

// Helper function to get a lesson (with fallback for topics without detailed lessons)
export const getLessonByTopic = (topicName) => {
  if (MOCK_LESSONS[topicName]) {
    return MOCK_LESSONS[topicName];
  }
  
  // Generate a default lesson for topics without detailed content
  return {
    title: topicName,
    learningObjectives: [
      `Understand the core concepts of ${topicName}`,
      `Apply ${topicName} knowledge to solve related problems`,
      `Explain the key principles of ${topicName} to others`,
      `Connect ${topicName} to real-world situations in Malawi`
    ],
    introduction: `Welcome to your lesson on ${topicName}! Today, we will explore this important topic together. In Malawi, understanding ${topicName.toLowerCase()} helps us in many areas of life, from farming to technology and beyond.`,
    detailedContent: `Let me help you understand ${topicName}. This topic is important because it connects to many things we see and do every day.

In ${topicName.toLowerCase()}, we start with the basic ideas. Think about how this applies to your community in Malawi. For example, farmers use these principles, students apply them in class, and professionals use them in their work.

Take your time to study this material. Practice with examples from your textbook. Ask your teacher questions if something is unclear. Remember, learning takes time and patience.

As you study ${topicName.toLowerCase()}, try to connect what you learn to the world around you. This will help you remember and understand better.`,
    summary: `${topicName} is an important topic in your ${localStorage.getItem('userForm') || 'Form'} curriculum. Keep practicing and you will master it. Remember to review your notes and ask questions when you need help.`,
    estimatedTime: '15 mins'
  };
};