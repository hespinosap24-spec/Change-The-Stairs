/* ============================================================
   CHANGE THE STAIRS — Dragon Repeller
   Lógica principal del juego
   ============================================================ */

// ============================================================
// SECCIÓN 0: SISTEMA DE IDIOMAS
// Detecta el idioma del navegador y aplica la traducción.
// ============================================================

const LANG = navigator.language.startsWith('es') ? 'es' : 'en';

const T = {
  en: {
    // Title screen
    eyebrow:        "— A tale from Valdoria —",
    logoSub:        "Dragon Repeller",
    nameLabel:      "Your name, traveller:",
    namePlaceholder:"Enter name…",
    fateLabel:      "Choose your fate:",
    diffEasyName:   "Explorer",    diffEasyDesc:   "Easier combat, more gold",
    diffNormalName: "Adventurer",  diffNormalDesc: "Balanced experience",
    diffHardName:   "Legend",      diffHardDesc:   "Brutal. No mercy.",
    btnStart:       "Begin the Journey",
    quote:          '"Heroes are not those who win.<br>They are those who keep walking."',
    // Music player
    trackExplore:   "Valdoria Theme",
    trackCombat:    "Combat Theme",
    // Zone header
    stageLabel:     "Stage",
    faceVharok:     "Face Vharok",
    // Store
    merchantText:   'The merchant eyes you with tired suspicion. "What do you need?"',
    buyHealth:      "Buy Health\n(10g)",
    maxWeapon:      "Max weapon",
    leaveStore:     "Leave Store",
    notEnoughGold:  "Not enough gold.",
    drankVial:      "You drink a small vial. (+20 HP)",
    gripWeapon:     w => `You grip the ${w}. It feels right.`,
    buyWeaponLabel: (n, c) => `Buy ${n}\n(${c}g)`,
    // Combat buttons
    attackBtn:      "⚔ Attack",
    dodgeBtn:       "🛡 Dodge",
    runBtn:         "🏃 Run (–5 HP)",
    // Combat messages
    monsterBlocks:  (m, lv) => `A ${m} (Lv ${lv}) blocks your path!`,
    youSwing:       w  => `You swing your ${w}!`,
    youMiss:        " You miss!",
    critHit:        " CRITICAL HIT!",
    lifesteal:      n  => ` Life steal: +${n} HP.`,
    burn:           " The enemy burns!",
    strikesBack:    (m, d) => `\nThe ${m} strikes back (${d} dmg).`,
    weaponBreaks:   w  => `\nYour ${w} breaks!`,
    dodgeMsg:       m  => `You dodge the ${m}'s attack. No damage taken.`,
    runMsg:         "You flee! The monster's claws graze you. (−5 HP)",
    // Post-combat
    monsterFalls:   (m, xp, g) => `The ${m} falls! +${xp} XP, +${g}g.`,
    secretBoss:     m => `⚡ The shadows tremble — ${m} emerges from the darkness!`,
    secretDefeated: "✨ Secret boss defeated! Bonus rewards claimed.",
    levelUp:        lv => `\n⭐ Level Up! You are now Lv ${lv}. Full heal!`,
    storeBtn:       "🏪 Store",
    continueBtn:    "➡ Continue",
    combatHint:     "Combat secret sequence for this zone",
    // End screen
    winText:  n => `<strong>Vharok falls.</strong>\n\nThe kingdom of Valdoria is free.\n\nBut ${n} knows: the walls are still broken,\nthe corrupt still rule, the poor still suffer.\n\nKilling the monster was the easy part.\n\n<em>You Win! 🏆</em>`,
    loseText: (n, e) => `${n} falls.\n\nThe ${e} stands over the silence.\n\nThe road ends here.\n\n<em>☠ You Died</em>`,
    playAgain: "Play Again",
    tryAgain:  "Try Again",
    // Inventory panel
    weaponLabel: "Weapon",
    powerLabel:  "Power",
    diffLabel:   "Diff",
  },
  es: {
    // Pantalla de título
    eyebrow:        "— Un cuento de Valdoria —",
    logoSub:        "Dragon Repeller",
    nameLabel:      "Tu nombre, viajero:",
    namePlaceholder:"Escribe un nombre…",
    fateLabel:      "Elige tu destino:",
    diffEasyName:   "Explorador",   diffEasyDesc:   "Combate más fácil, más oro",
    diffNormalName: "Aventurero",   diffNormalDesc: "Experiencia equilibrada",
    diffHardName:   "Leyenda",      diffHardDesc:   "Brutal. Sin piedad.",
    btnStart:       "Comenzar la Aventura",
    quote:          '"Los héroes no son los que ganan.<br>Son los que siguen caminando."',
    // Reproductor
    trackExplore:   "Tema de Valdoria",
    trackCombat:    "Tema de Combate",
    // Cabecera de zona
    stageLabel:     "Fase",
    faceVharok:     "Enfrentar a Vharok",
    // Tienda
    merchantText:   'El mercader te mira con cansada sospecha. "¿Qué necesitas?"',
    buyHealth:      "Comprar Salud\n(10g)",
    maxWeapon:      "Arma máxima",
    leaveStore:     "Salir de la Tienda",
    notEnoughGold:  "No tienes suficiente oro.",
    drankVial:      "Bebes un pequeño vial. (+20 PV)",
    gripWeapon:     w => `Empuñas el/la ${w}. Se siente bien.`,
    buyWeaponLabel: (n, c) => `Comprar ${n}\n(${c}g)`,
    // Botones de combate
    attackBtn:      "⚔ Atacar",
    dodgeBtn:       "🛡 Esquivar",
    runBtn:         "🏃 Huir (–5 PV)",
    // Mensajes de combate
    monsterBlocks:  (m, lv) => `¡Un/a ${m} (Nv ${lv}) te bloquea el paso!`,
    youSwing:       w  => `¡Atacas con tu ${w}!`,
    youMiss:        " ¡Fallas!",
    critHit:        " ¡GOLPE CRÍTICO!",
    lifesteal:      n  => ` Robo de vida: +${n} PV.`,
    burn:           " ¡El enemigo arde!",
    strikesBack:    (m, d) => `\n${m} contraataca (${d} daño).`,
    weaponBreaks:   w  => `\n¡Tu ${w} se rompe!`,
    dodgeMsg:       m  => `Esquivas el ataque de ${m}. Sin daño recibido.`,
    runMsg:         "¡Huyes! Las garras del monstruo te rozan. (−5 PV)",
    // Post-combate
    monsterFalls:   (m, xp, g) => `¡${m} cae! +${xp} XP, +${g}g.`,
    secretBoss:     m => `⚡ Las sombras tiemblan — ¡${m} emerge de la oscuridad!`,
    secretDefeated: "✨ ¡Jefe secreto derrotado! Recompensas extra obtenidas.",
    levelUp:        lv => `\n⭐ ¡Subiste de nivel! Ahora eres Nv ${lv}. ¡Vida completa!`,
    storeBtn:       "🏪 Tienda",
    continueBtn:    "➡ Continuar",
    combatHint:     "Secuencia secreta de combate para esta zona",
    // Fin del juego
    winText:  n => `<strong>Vharok cae.</strong>\n\nEl reino de Valdoria es libre.\n\nPero ${n} sabe: los muros siguen rotos,\nlos corruptos aún gobiernan, los pobres aún sufren.\n\nMatar al monstruo era la parte fácil.\n\n<em>¡Ganaste! 🏆</em>`,
    loseText: (n, e) => `${n} cae.\n\n${e} se cierne sobre el silencio.\n\nEl camino termina aquí.\n\n<em>☠ Has Muerto</em>`,
    playAgain: "Jugar de nuevo",
    tryAgain:  "Intentar de nuevo",
    // Panel de inventario
    weaponLabel: "Arma",
    powerLabel:  "Poder",
    diffLabel:   "Dif.",
  }
};

// Helper de acceso rápido a la traducción activa
const t = key => T[LANG][key];

// ============================================================
// SECCIÓN 1: DATOS DEL JUEGO
// ============================================================

const WEAPONS = [
  { name: "Stick",         power: 5,   cost: 0,   image: "./images/stick.png"       },
  { name: "Dagger",        power: 20,  cost: 30,  image: "./images/dagger.png"      },
  { name: "Sickle",   power: 35,  cost: 60,  image: "./images/sickle.png"      },
  { name: "Sword",         power: 55,  cost: 100, image: "./images/sword.png"       },
  { name: "Long Sword",    power: 80,  cost: 150, image: "./images/long_sword.png"       },
  { name: "War Hammer",    power: 110, cost: 220, image: "./images/claw-hammer.png" },
  { name: "Fire Whip",     power: 90,  cost: 200, image: "./images/Fire_whip.png",    special: "burn"      },
  { name: "Void Dagger",   power: 60,  cost: 180, image: "./images/Void_Dagger.png",   special: "lifesteal" },
  { name: "Enchanted Bow", power: 70,  cost: 160, image: "./images/Enchanted_Bow.png",    special: "pierce"    },
];

const MONSTERS = [
  { id: 0,  name: "Ash Rat",           level: 1,  health: 20,   xp: 5,    gold: 8,   zone: 1, image: "./images/Ash-rat.png"        },
  { id: 1,  name: "slime",       level: 2,  health: 35,   xp: 8,    gold: 12,  zone: 1, image: "./images/slime.png"        },
  { id: 2,  name: "Hollow Wolf",       level: 3,  health: 52,   xp: 12,   gold: 18,  zone: 1, image: "./images/fanged-beast.png" },
  { id: 3,  name: "Stone Imp",         level: 4,  health: 72,   xp: 16,   gold: 25,  zone: 1, image: "./images/stone_imp.png" },
  { id: 4,  name: "Cursed Deer",       level: 5,  health: 100,  xp: 22,   gold: 35,  zone: 2, image: "./images/cursed_deer.png" },
  { id: 5,  name: "Shadow Wraith",     level: 6,  health: 130,  xp: 28,   gold: 44,  zone: 2, image: "./images/shadow_wrait.png" },
  { id: 6,  name: "Ash Golem",         level: 7,  health: 165,  xp: 36,   gold: 56,  zone: 2, image: "./images/ash_golem.png" },
  { id: 7,  name: "Forest Specter",    level: 8,  health: 205,  xp: 44,   gold: 70,  zone: 2, image: "./images/forest_specter.png" },
  { id: 8,  name: "Fallen Guard",      level: 9,  health: 255,  xp: 55,   gold: 84,  zone: 3, image: "./images/Fallen_guard.png" },
  { id: 9,  name: "Void Hound",        level: 10, health: 315,  xp: 68,   gold: 104, zone: 3, image: "./images/Void_Hound.png" },
  { id: 10, name: "Plague Bearer",     level: 11, health: 385,  xp: 82,   gold: 126, zone: 3, image: "./images/plague_bearer.png" },
  { id: 11, name: "Corrupt Champion",  level: 12, health: 465,  xp: 98,   gold: 150, zone: 3, image: "./images/Corrupt_Champion.png" },
  { id: 12, name: "Bone Archer",       level: 13, health: 555,  xp: 116,  gold: 178, zone: 4, image: "./images/Bone_Archer.png" },
  { id: 13, name: "War Shade",         level: 14, health: 655,  xp: 136,  gold: 208, zone: 4, image: "./images/war_shade.png" },
  { id: 14, name: "Echo Fiend",        level: 15, health: 765,  xp: 158,  gold: 242, zone: 4, image: "./images/Echo Fiend.png" },
  { id: 15, name: "Rusted Colossus",   level: 16, health: 885,  xp: 182,  gold: 278, zone: 4, image: "./images/Rusted_Colossus.png" },
  { id: 16, name: "Lava Crawler",      level: 17, health: 1015, xp: 210,  gold: 320, zone: 5, image: "./images/Lava_Crawler.png" },
  { id: 17, name: "Ember Titan",       level: 18, health: 1165, xp: 240,  gold: 368, zone: 5, image: "./images/Ember_Titan.png" },
  { id: 18, name: "Cinder Drake",      level: 19, health: 1335, xp: 274,  gold: 420, zone: 5, image: "./images/Cinder_Drake.png" },
  { id: 19, name: "Grimoire Rat King", level: 5,  health: 150,  xp: 60,   gold: 90,  zone: 1, image: "./images/Grimoire_Rat_King.png", isSecret: true },
  { id: 20, name: "Shadow Dryad",      level: 10, health: 380,  xp: 150,  gold: 200, zone: 2, image: "./images/Shadow_dryad.png", isSecret: true },
  { id: 21, name: "Corrupted Paladin", level: 15, health: 760,  xp: 300,  gold: 350, zone: 3, image: "./images/Corrupted_paladin.png", isSecret: true },
  { id: 22, name: "Echo King",         level: 20, health: 1400, xp: 500,  gold: 500, zone: 4, image: "./images/Echo_King.png", isSecret: true },
  { id: 23, name: "Ash Phoenix",       level: 24, health: 2200, xp: 750,  gold: 700, zone: 5, image: "./images/Ash_Phoenix.png", isSecret: true },
  { id: 24, name: "Vharok the Dragon", level: 25, health: 200,  xp: 1000, gold: 999, zone: 6, image: "./images/dragon.png", isFinal: true },
];

// zoneDesc tiene versión en/es para cada nivel
const LEVEL_CONFIG = [
  { gameLevel: 1,  zone: 1, monsterIds: [0,1,2],    secretMonsterId: 19,   zoneDesc: { en: "The ruined village smells of ash and regret.",                         es: "El pueblo en ruinas huele a ceniza y arrepentimiento."                   } },
  { gameLevel: 2,  zone: 1, monsterIds: [0,2,3],    secretMonsterId: 19,   zoneDesc: { en: "Creatures roam the burnt fields.",                                     es: "Criaturas rondan los campos quemados."                                   } },
  { gameLevel: 3,  zone: 1, monsterIds: [1,2,3],    secretMonsterId: 19,   zoneDesc: { en: "The forest edge grows darker with each step.",                         es: "El borde del bosque se oscurece con cada paso."                         } },
  { gameLevel: 4,  zone: 1, monsterIds: [1,3,2],    secretMonsterId: 19,   zoneDesc: { en: "Something ancient stirs in the ruined shrine.",                        es: "Algo antiguo se agita en el santuario en ruinas."                       } },
  { gameLevel: 5,  zone: 2, monsterIds: [4,5,6],    secretMonsterId: 20,   zoneDesc: { en: "Dead trees stretch endlessly. Mist obscures the path.",                es: "Árboles muertos se extienden sin fin. La niebla oculta el camino."      } },
  { gameLevel: 6,  zone: 2, monsterIds: [4,6,7],    secretMonsterId: 20,   zoneDesc: { en: "Shadows move between the trunks without sound.",                       es: "Las sombras se mueven entre los troncos sin hacer ruido."               } },
  { gameLevel: 7,  zone: 2, monsterIds: [5,6,7],    secretMonsterId: 20,   zoneDesc: { en: "The forest grows denser, colder, quieter.",                            es: "El bosque se vuelve más denso, frío y silencioso."                      } },
  { gameLevel: 8,  zone: 2, monsterIds: [5,7,6],    secretMonsterId: 20,   zoneDesc: { en: "Ruins of an ancient shrine appear through the fog.",                   es: "Ruinas de un santuario antiguo aparecen entre la neblina."              } },
  { gameLevel: 9,  zone: 3, monsterIds: [8,9,10],   secretMonsterId: 21,   zoneDesc: { en: "The once-grand city of Lumen lies in decay and silence.",               es: "La otrora grandiosa ciudad de Lumen yace en decadencia y silencio."     } },
  { gameLevel: 10, zone: 3, monsterIds: [8,10,11],  secretMonsterId: 21,   zoneDesc: { en: "Corrupt guards patrol the broken, empty streets.",                     es: "Guardias corruptos patrullan las calles rotas y vacías."                } },
  { gameLevel: 11, zone: 3, monsterIds: [9,10,11],  secretMonsterId: 21,   zoneDesc: { en: "The market district has become a battlefield of shadows.",              es: "El distrito del mercado se ha convertido en un campo de batalla."       } },
  { gameLevel: 12, zone: 3, monsterIds: [9,11,10],  secretMonsterId: 21,   zoneDesc: { en: "The palace gates loom ahead, shattered and forgotten.",                es: "Las puertas del palacio se alzan destrozadas y olvidadas."              } },
  { gameLevel: 13, zone: 4, monsterIds: [12,13,14], secretMonsterId: 22,   zoneDesc: { en: "Weapons of fallen armies litter the mud for miles.",                   es: "Armas de ejércitos caídos cubren el barro durante kilómetros."          } },
  { gameLevel: 14, zone: 4, monsterIds: [12,14,15], secretMonsterId: 22,   zoneDesc: { en: "The wind carries the echoes of ten thousand last cries.",              es: "El viento lleva los ecos de diez mil últimos gritos."                   } },
  { gameLevel: 15, zone: 4, monsterIds: [13,14,15], secretMonsterId: 22,   zoneDesc: { en: "Skeletons of war machines rust half-buried in the field.",             es: "Esqueletos de máquinas de guerra se oxidan a medio enterrar."           } },
  { gameLevel: 16, zone: 4, monsterIds: [13,15,14], secretMonsterId: 22,   zoneDesc: { en: "The mountains glow red on the horizon. You are close.",                es: "Las montañas brillan en rojo en el horizonte. Estás cerca."             } },
  { gameLevel: 17, zone: 5, monsterIds: [16,17,18], secretMonsterId: 23,   zoneDesc: { en: "Ash falls like grey snow. The air tastes of sulfur.",                  es: "La ceniza cae como nieve gris. El aire sabe a azufre."                  } },
  { gameLevel: 18, zone: 5, monsterIds: [16,18,17], secretMonsterId: 23,   zoneDesc: { en: "The heat is unbearable. Rocks crack beneath your boots.",              es: "El calor es insoportable. Las rocas se agrietan bajo tus botas."        } },
  { gameLevel: 19, zone: 5, monsterIds: [17,18,16], secretMonsterId: 23,   zoneDesc: { en: "The ground trembles. A roar shakes the mountain walls.",               es: "El suelo tiembla. Un rugido sacude las paredes de la montaña."          } },
  { gameLevel: 20, zone: 6, monsterIds: [24],        secretMonsterId: null, zoneDesc: { en: "The cave opens. Vharok waits. There is no turning back.",             es: "La cueva se abre. Vharok espera. No hay vuelta atrás."                  } },
];

// Nombres de zona con traducción
const ZONE_NAMES = {
  en: ["", "Briar Hollow", "Grey Forest",  "Lumen City",    "Echo Plains",        "Hollowfire",   "Dragon's Lair"],
  es: ["", "Valle hórrido", "Bosque Gris",  "Ciudad Lumen",  "Llanuras del Eco",   "Fuegoceniza",  "Guarida del Dragón"],
};

const SECRET_SEQUENCES = {
  1: ["D","D","A"],
  2: ["A","D","A","D"],
  3: ["D","A","A","D"],
  4: ["A","A","D","A"],
  5: ["D","D","D","A"],
};

const DIFFICULTIES = {
  easy:   { playerMult: 1.2,  monsterMult: 0.75, goldMult: 1.3  },
  normal: { playerMult: 1.0,  monsterMult: 1.0,  goldMult: 1.0  },
  hard:   { playerMult: 0.85, monsterMult: 1.35, goldMult: 0.75 },
};

// ============================================================
// SECCIÓN 2: ESTADO DEL JUEGO
// ============================================================

let gs = {
  playerName:     "Hero",
  difficulty:     "easy",
  gameLevel:      1,
  playerLevel:    1,
  xp:             0,
  xpToNext:       15,
  health:         100,
  maxHealth:      100,
  gold:           50,
  weaponIdx:      0,
  inventory:      ["Stick"],
  phase:          "title",
  fighting:       null,
  monsterHP:      0,
  combatSeq:      [],
  secretDefeated: {},
  secretFighting: false,
};

// ============================================================
// SECCIÓN 3: REFERENCIAS AL DOM
// ============================================================

const $ = id => document.getElementById(id);

const screenTitle  = $("screen-title");
const screenGame   = $("screen-game");

const visualEl      = $("visual");
const heroImg       = $("heroImage");
const monsterImg    = $("monsterImage");
const monsterStats  = $("monsterStats");
const monsterNameEl = $("monsterName");
const monsterHPText = $("monsterHealthText");
const monsterHPBar  = $("monsterHealthBar");
const playerHPBar   = $("playerHealthBar");
const xpBarEl       = $("xpBar");
const healthText    = $("healthText");
const xpText        = $("xpText");
const levelText     = $("levelText");
const goldText      = $("goldText");
const zoneNameEl    = $("zone-name");
const textEl        = $("text");
const btn1          = $("button1");
const btn2          = $("button2");
const btn3          = $("button3");
const invContent    = $("inventoryContent");
const secretHint    = $("secret-hint");

const inputName      = $("input-name");
const btnStart       = $("btn-start");
const diffBtns       = document.querySelectorAll(".diff-btn");

const bgMusic        = $("bgMusic");
const combatMusic    = $("combatMusic");
const vinylEl        = $("vinyl-record");
const btnPlay        = $("btn-play");
const btnVolDown     = $("btn-vol-down");
const btnVolUp       = $("btn-vol-up");
const vinylVolFill   = $("vinyl-vol-fill");
const btnPlayM       = $("btn-play-m");
const mobileDisc     = $("mobile-disc");
const volSlider      = $("vol-slider");
const desktopPlayer  = $("music-player-desktop");

// ============================================================
// SECCIÓN 4: REPRODUCTOR DE MÚSICA
// ============================================================

let musicPlaying = false;
let musicVolume  = 0.7;
let currentTrack = "explore";

function switchTrack(track, crossfade = true) {
  if (track === currentTrack) return;

  const incoming = track === "combat" ? combatMusic : bgMusic;
  const outgoing  = track === "combat" ? bgMusic     : combatMusic;

  currentTrack = track;

  if (crossfade) {
    fadeTo(outgoing, 0, 150, () => {
      outgoing.pause();
      outgoing.volume = musicVolume;
    });
  } else {
    outgoing.pause();
  }

  if (musicPlaying) {
    incoming.volume = crossfade ? 0 : musicVolume;
    incoming.currentTime = 0;
    incoming.play().catch(() => {});
    if (crossfade) fadeTo(incoming, musicVolume, 150);
  }

  const trackLabel = document.querySelector(".mobile-track");
  if (trackLabel) {
    trackLabel.textContent = track === "combat" ? t('trackCombat') : t('trackExplore');
  }
}

function fadeTo(el, target, ms, cb) {
  const steps    = 10;
  const interval = ms / steps;
  const delta    = (target - el.volume) / steps;
  let   count    = 0;

  const timer = setInterval(() => {
    count++;
    el.volume = Math.max(0, Math.min(1, el.volume + delta));
    if (count >= steps) {
      clearInterval(timer);
      el.volume = target;
      if (cb) cb();
    }
  }, interval);
}

function toggleMusic() {
  const active = currentTrack === "combat" ? combatMusic : bgMusic;

  if (musicPlaying) {
    active.pause();
    vinylEl.classList.remove("playing");
    mobileDisc.classList.remove("playing");
    btnPlay.textContent  = "▶";
    btnPlayM.textContent = "▶";
  } else {
    active.volume = musicVolume;
    active.play().catch(() => {});
    vinylEl.classList.add("playing");
    mobileDisc.classList.add("playing");
    btnPlay.textContent  = "⏸";
    btnPlayM.textContent = "⏸";
  }
  musicPlaying = !musicPlaying;
}

function setVolume(vol) {
  musicVolume = Math.max(0, Math.min(1, vol));
  bgMusic.volume     = musicVolume;
  combatMusic.volume = musicVolume;
  vinylVolFill.style.height = (musicVolume * 100) + "%";
  volSlider.value = musicVolume * 100;
}

// Vinilo: abre/cierra el menú emergente al hacer clic
if (vinylEl) {
  vinylEl.addEventListener("click", e => {
    e.stopPropagation();
    desktopPlayer.classList.toggle("open");
  });
}

// Cerrar el menú al hacer clic fuera del reproductor
document.addEventListener("click", e => {
  if (desktopPlayer && !desktopPlayer.contains(e.target)) {
    desktopPlayer.classList.remove("open");
  }
});

// Botones del panel desplegable (stopPropagation para que no cierren el menú)
btnPlay.addEventListener("click",    e => { e.stopPropagation(); toggleMusic(); });
btnVolDown.addEventListener("click", e => { e.stopPropagation(); setVolume(musicVolume - 0.1); });
btnVolUp.addEventListener("click",   e => { e.stopPropagation(); setVolume(musicVolume + 0.1); });

// Reproductor móvil
btnPlayM.addEventListener("click", toggleMusic);
volSlider.addEventListener("input", () => setVolume(volSlider.value / 100));

setVolume(0.7);

// ============================================================
// SECCIÓN 5: TRADUCCIONES DE LA UI ESTÁTICA
// ============================================================

function applyTranslations() {
  // Logo
  const eyebrow = document.querySelector('.logo-eyebrow');
  if (eyebrow) eyebrow.textContent = t('eyebrow');
  const logoSub = document.querySelector('.logo-sub');
  if (logoSub)  logoSub.textContent = t('logoSub');

  // Formulario
  const nameLabel = document.querySelector('label[for="input-name"]');
  if (nameLabel) nameLabel.textContent = t('nameLabel');
  if (inputName) inputName.placeholder = t('namePlaceholder');

  // Label "Choose your fate"
  const fateLabel = document.querySelector('.field-group:nth-child(2) > label:not(.diff-btn)');
  if (fateLabel) fateLabel.textContent = t('fateLabel');

  // Botones de dificultad
  const diffMap = { easy: 'Easy', normal: 'Normal', hard: 'Hard' };
  document.querySelectorAll('.diff-btn').forEach(btn => {
    const key    = diffMap[btn.dataset.diff];
    const strong = btn.querySelector('strong');
    const small  = btn.querySelector('small');
    if (strong) strong.textContent = t(`diff${key}Name`);
    if (small)  small.textContent  = t(`diff${key}Desc`);
  });

  // Botón de inicio y cita
  if (btnStart) btnStart.textContent = t('btnStart');
  const quote = document.querySelector('.title-quote');
  if (quote) quote.innerHTML = t('quote');

  // Etiqueta de pista en reproductor móvil
  const trackLabel = document.querySelector('.mobile-track');
  if (trackLabel) trackLabel.textContent = t('trackExplore');
}

// Selección de dificultad
diffBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    diffBtns.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    gs.difficulty = btn.dataset.diff;
  });
});

// Botón de inicio
if (btnStart) {
  btnStart.addEventListener("click", () => {
    const name = inputName.value.trim();
    gs.playerName = name || "Hero";
    startGame();
  });
}

// ============================================================
// SECCIÓN 6: INICIAR / REINICIAR EL JUEGO
// ============================================================

function startGame() {
  const diff = gs.difficulty;
  const name = gs.playerName;
  console.log("STARTGAME EJECUTADO");
  console.log(screenTitle);
  console.log(screenGame);
  screenTitle.style.display = "none";
  screenGame.style.display = "block";
  screenTitle.style.display = "none";
  screenGame.style.display = "block";


  gs = {
    playerName:     name,
    difficulty:     diff,
    gameLevel:      1,
    playerLevel:    1,
    xp:             0,
    xpToNext:       15,
    health:         100,
    maxHealth:      100,
    gold:           50,
    weaponIdx:      0,
    inventory:      ["Stick"],
    phase:          "hub",
    fighting:       null,
    monsterHP:      0,
    combatSeq:      [],
    secretDefeated: {},
    secretFighting: false,
  };

  screenTitle.classList.remove("active");
  screenGame.classList.add("active");

  updateAllStats();
  showZoneHub();

  if (!musicPlaying) {
    musicPlaying = true;
    bgMusic.volume = musicVolume;
    bgMusic.play().catch(() => {});
    vinylEl.classList.add("playing");
    const mobileDisc = document.getElementById("mobile-disc");
    if (mobileDisc) mobileDisc.classList.add("playing");
    btnPlay.textContent  = "⏸";
    const btnPlayM = document.getElementById("btn-play-m");
    if (btnPlayM) btnPlayM.textContent = "⏸";
  }
}

function restart() {

  // Reset completo del estado
  gs = {
    playerName: "Hero",
    difficulty: "easy",
    gameLevel: 1,
    playerLevel: 1,
    xp: 0,
    xpToNext: 15,
    health: 100,
    maxHealth: 100,
    gold: 50,
    weaponIdx: 0,
    inventory: ["Stick"],
    phase: "title",
    fighting: null,
    monsterHP: 0,
    combatSeq: [],
    secretDefeated: {},
    secretFighting: false,
  };

  // Reset visual
  monsterImg.style.display = "none";
  monsterStats.style.display = "none";

  // Mostrar menú inicial
  screenGame.style.display = "none";
  screenTitle.style.display = "flex";

  screenGame.classList.remove("active");
  screenTitle.classList.add("active");

  // Restaurar dificultad visual
  diffBtns.forEach(btn => btn.classList.remove("selected"));
  diffBtns[0].classList.add("selected");

  // Limpiar nombre
  inputName.value = "";

  // Restaurar música
  switchTrack("explore");

  // Restaurar texto
  textEl.textContent = "Welcome to Valdoria…";

  // Restaurar botones del juego
  setButtons(
    ["Store", "Fight", "Advance"],
    [null, null, null]
  );

  // Actualizar UI
  updateAllStats();
}

// ============================================================
// SECCIÓN 7: HUB DE ZONA
// ============================================================

function showZoneHub() {
  gs.phase     = "hub";
  gs.combatSeq = [];

  switchTrack("explore");

  const lvlCfg   = LEVEL_CONFIG[gs.gameLevel - 1];
  const zoneName = ZONE_NAMES[LANG][lvlCfg.zone];

  zoneNameEl.textContent = zoneName;
  // Actualizar "Stage/Fase X/20" con traducción
  $('progress-badge').innerHTML =
    `${t('stageLabel')} <span id="stage-num">${gs.gameLevel}</span>/20`;

  setZoneBackground(lvlCfg.zone);
  monsterImg.style.display   = "none";
  monsterStats.style.display = "none";
  secretHint.textContent     = "";

  // Texto narrativo con descripción de zona traducida
  textEl.innerHTML = `<em>${gs.playerName}</em> — ${lvlCfg.zoneDesc[LANG]}`;

  // Nivel final: solo el dragón
  if (gs.gameLevel === 20) {
    setButtons(
      [t('faceVharok'), null, null],
      [() => startFight(MONSTERS[24]), null, null]
    );
    btn2.disabled = true;
    btn3.disabled = true;
    return;
  }

  // btn1 = Tienda, btn2 = Monstruo 0, btn3 = Monstruo 1
  const monsters = lvlCfg.monsterIds.map(id => MONSTERS[id]);
  const diff     = DIFFICULTIES[gs.difficulty];

  const fightLabel = m =>
    `${m.name}\n(Lv ${m.level} · ${Math.round(m.health * diff.monsterMult)} HP)`;

  setButtons(
    [t('storeBtn'), fightLabel(monsters[0]), fightLabel(monsters[1])],
    [goStore, () => startFight(monsters[0]), () => startFight(monsters[1])]
  );
}

// ============================================================
// SECCIÓN 8: TIENDA
// ============================================================

function goStore() {
  gs.phase = "store";
  setZoneBackground("store");
  switchTrack("explore");
  monsterImg.style.display   = "none";
  monsterStats.style.display = "none";

  textEl.textContent = t('merchantText');

  const nextWpnIdx = gs.weaponIdx + 1;
  const canBuyWpn  = nextWpnIdx < 6;

  const wpnLabel = canBuyWpn
    ? t('buyWeaponLabel')(WEAPONS[nextWpnIdx].name, WEAPONS[nextWpnIdx].cost)
    : t('maxWeapon');

  setButtons(
    [t('buyHealth'), wpnLabel, t('leaveStore')],
    [buyHealth, canBuyWpn ? buyWeapon : null, showZoneHub]
  );

  if (!canBuyWpn) btn2.disabled = true;
}

function buyHealth() {
  const cost = 10;
  if (gs.gold < cost) { textEl.textContent = t('notEnoughGold'); return; }
  gs.gold  -= cost;
  gs.health = Math.min(gs.health + 20, gs.maxHealth);
  updateAllStats();
  textEl.textContent = t('drankVial');
}

function buyWeapon() {
  const next = gs.weaponIdx + 1;
  const wpn  = WEAPONS[next];
  if (!wpn || next >= 6) return;

  if (gs.gold < wpn.cost) { textEl.textContent = t('notEnoughGold'); return; }
  gs.gold -= wpn.cost;
  gs.weaponIdx = next;
  gs.inventory.push(wpn.name);
  updateAllStats();
  textEl.textContent = t('gripWeapon')(wpn.name);
  if (gs.weaponIdx >= 5) btn2.disabled = true;
}

// ============================================================
// SECCIÓN 9: COMBATE
// ============================================================

function startFight(monster) {
  gs.phase          = "combat";
  gs.fighting       = monster;
  gs.secretFighting = !!monster.isSecret;

  const diff   = DIFFICULTIES[gs.difficulty];
  gs.monsterHP = Math.round(monster.health * diff.monsterMult);

  monsterImg.src             = monster.image;
  monsterImg.style.display   = "block";
  monsterStats.style.display = "flex";
  monsterNameEl.textContent  = monster.name;

  updateAllStats();
  setZoneBackground("fight");

  const lvlCfg = LEVEL_CONFIG[gs.gameLevel - 1];
  const seq    = SECRET_SEQUENCES[lvlCfg.zone];
  if (seq && !monster.isSecret && !monster.isFinal) {
    secretHint.textContent = "★ " + seq.join(" ");
    secretHint.title = t('combatHint');
  } else {
    secretHint.textContent = "";
  }

  switchTrack("combat");
  textEl.textContent = t('monsterBlocks')(monster.name, monster.level);

  setButtons(
    [t('attackBtn'), t('dodgeBtn'), t('runBtn')],
    [attackAction, dodgeAction, runAction]
  );
}

function attackAction() {
  if (gs.phase !== "combat") return;
  recordCombatAction("A");

  const diff   = DIFFICULTIES[gs.difficulty];
  const weapon = WEAPONS[gs.weaponIdx];
  let   msg    = t('youSwing')(weapon.name);

  triggerAnimation(heroImg, "lunge-anim", 350);

  if (Math.random() > 0.2) {
    let dmg = weapon.power + Math.floor(Math.random() * (gs.playerLevel * 2)) + 1;

    const isCrit = Math.random() <= 0.1;
    if (isCrit) {
      dmg *= 2;
      msg += t('critHit');
      triggerAnimation($("game-wrapper"), "shake-anim", 450);
    }

    if (weapon.special === "lifesteal") {
      const steal = Math.round(dmg * 0.2);
      gs.health = Math.min(gs.health + steal, gs.maxHealth);
      msg += t('lifesteal')(steal);
    }
    if (weapon.special === "burn") {
      msg += t('burn');
      dmg  = Math.round(dmg * 1.3);
    }

    gs.monsterHP -= dmg;
    msg += ` (${dmg} dmg)`;
    triggerAnimation(monsterImg, "flash-anim", 300);
  } else {
    msg += t('youMiss');
  }

  if (gs.monsterHP > 0) {
    const monsterDmg = getMonsterDamage(gs.fighting.level);
    gs.health -= Math.round(monsterDmg * diff.monsterMult);
    msg += t('strikesBack')(gs.fighting.name, Math.round(monsterDmg * diff.monsterMult));
  }

  if (Math.random() <= 0.05 && gs.inventory.length > 1) {
    const broken = gs.inventory.pop();
    gs.weaponIdx = Math.max(0, gs.weaponIdx - 1);
    msg += t('weaponBreaks')(broken);
  }

  textEl.textContent = msg;
  updateAllStats();
  checkCombatEnd();
}

function dodgeAction() {
  if (gs.phase !== "combat") return;
  recordCombatAction("D");
  textEl.textContent = t('dodgeMsg')(gs.fighting.name);
  updateAllStats();
}

function runAction() {
  if (gs.phase !== "combat") return;
  gs.health -= 5;
  if (gs.health <= 0) gs.health = 1;
  textEl.textContent = t('runMsg');
  updateAllStats();
  showZoneHub();
}

function checkCombatEnd() {
  if (gs.health <= 0) { loseGame(); return; }
  if (gs.monsterHP <= 0) {
    gs.fighting.isFinal ? winGame() : defeatMonster();
  }
}

function defeatMonster() {
  const diff    = DIFFICULTIES[gs.difficulty];
  const monster = gs.fighting;

  const xpGained   = Math.round(monster.xp   * (gs.secretFighting ? 2   : 1));
  const goldGained  = Math.round(monster.gold * diff.goldMult * (gs.secretFighting ? 1.5 : 1));

  gs.xp   += xpGained;
  gs.gold += goldGained;

  let msg = t('monsterFalls')(monster.name, xpGained, goldGained);
  msg += checkLevelUp();
  textEl.textContent = msg;

  if (gs.secretFighting) {
    gs.secretDefeated[LEVEL_CONFIG[gs.gameLevel - 1].zone] = true;
    textEl.textContent += "\n" + t('secretDefeated');
  }

  if (!gs.secretFighting && gs.gameLevel < 20) gs.gameLevel++;

  monsterImg.style.display   = "none";
  monsterStats.style.display = "none";
  gs.fighting = null;

  updateAllStats();

  setButtons(
    [t('storeBtn'), t('continueBtn'), t('continueBtn')],
    [goStore, showZoneHub, showZoneHub]
  );
}

function checkLevelUp() {
  if (gs.xp < gs.xpToNext) return "";

  gs.playerLevel++;
  gs.xp      -= gs.xpToNext;
  gs.xpToNext = Math.round(gs.xpToNext * 2.2);
  gs.maxHealth += 10;
  gs.health    = gs.maxHealth;

  triggerAnimation($("game-wrapper"), "levelup-anim", 1000);
  return t('levelUp')(gs.playerLevel);
}

function getMonsterDamage(monsterLevel) {
  const base      = monsterLevel * 4;
  const reduction = Math.floor(Math.random() * Math.max(1, gs.xp * 0.1));
  return Math.max(1, base - reduction);
}

// ============================================================
// SECCIÓN 10: SECUENCIAS SECRETAS
// ============================================================

function recordCombatAction(action) {
  if (gs.secretFighting || gs.fighting?.isFinal) return;

  const lvlCfg = LEVEL_CONFIG[gs.gameLevel - 1];
  const seq    = SECRET_SEQUENCES[lvlCfg.zone];
  if (!seq) return;

  gs.combatSeq.push(action);
  if (gs.combatSeq.length > seq.length) gs.combatSeq.shift();

  const matches         = seq.every((s, i) => gs.combatSeq[i] === s);
  const alreadyDefeated = gs.secretDefeated[lvlCfg.zone];

  if (matches && lvlCfg.secretMonsterId !== null && !alreadyDefeated) {
    gs.combatSeq = [];
    const secretBoss = MONSTERS[lvlCfg.secretMonsterId];
    textEl.textContent = t('secretBoss')(secretBoss.name);
    setTimeout(() => startFight(secretBoss), 1200);
  }
}

// ============================================================
// SECCIÓN 11: FIN DEL JUEGO
// ============================================================

function winGame() {
  gs.phase = "win";
  monsterImg.style.display   = "none";
  monsterStats.style.display = "none";
  setZoneBackground(6);

  textEl.innerHTML = t('winText')(gs.playerName);

  setButtons(
    [t('playAgain'), t('playAgain'), t('playAgain')],
    [restart, restart, restart]
  );
}

function loseGame() {
  gs.phase = "lose";
  monsterImg.style.display   = "none";
  monsterStats.style.display = "none";

  textEl.innerHTML = t('loseText')(gs.playerName, gs.fighting?.name || "enemy");

  setButtons(
    [t('tryAgain'), t('tryAgain'), t('tryAgain')],
    [restart, restart, restart]
  );
}

// ============================================================
// SECCIÓN 12: ACTUALIZAR LA INTERFAZ
// ============================================================

function updateAllStats() {
  const diff = DIFFICULTIES[gs.difficulty];

  healthText.textContent = `${gs.health}/${gs.maxHealth}`;
  xpText.textContent     = `${gs.xp}/${gs.xpToNext}`;
  levelText.textContent  = gs.playerLevel;
  goldText.textContent   = gs.gold;

  const hpPct = Math.max(0, (gs.health / gs.maxHealth) * 100);
  playerHPBar.style.width = hpPct + "%";
  playerHPBar.style.backgroundColor =
    hpPct <= 20 ? "var(--red)" : hpPct <= 50 ? "var(--yellow)" : "var(--green)";

  const xpPct = Math.min(100, (gs.xp / gs.xpToNext) * 100);
  xpBarEl.style.width = xpPct + "%";

  if (gs.fighting) {
    const baseHP = Math.round(gs.fighting.health * diff.monsterMult);
    const mPct   = Math.max(0, (gs.monsterHP / baseHP) * 100);
    monsterHPBar.style.width = mPct + "%";
    monsterHPBar.style.backgroundColor =
      mPct <= 20 ? "var(--red)" : mPct <= 50 ? "var(--yellow)" : "var(--red)";
    monsterHPText.textContent = Math.max(0, gs.monsterHP);
    monsterNameEl.textContent = gs.fighting.name;
  }

  updateInventory();
}

function updateInventory() {
  const wpn = WEAPONS[gs.weaponIdx];
  const specialTag = wpn.special
    ? `<span style="color:var(--accent)"> [${wpn.special}]</span>`
    : "";

  // Nombre de dificultad traducido dinámicamente
  const diffKey  = `diff${gs.difficulty.charAt(0).toUpperCase() + gs.difficulty.slice(1)}Name`;
  const diffName = t(diffKey);

  invContent.innerHTML = `
    <div class="inv-stats">
      <p>${t('weaponLabel')}: <strong>${wpn.name}${specialTag}</strong></p>
      <p>${t('powerLabel')}:  <strong>${wpn.power}</strong></p>
      <p>${t('diffLabel')}:   <strong>${diffName}</strong></p>
    </div>
    <img id="weaponImage" src="${wpn.image}" alt="${wpn.name}">
  `;
}

function setZoneBackground(zone) {
  visualEl.className = "";
  if (zone === "store") {
    visualEl.classList.add("bg-store");
  } else if (zone === "fight") {
    const z = LEVEL_CONFIG[gs.gameLevel - 1].zone;
    visualEl.classList.add(`bg-zone-${z}`);
  } else {
    visualEl.classList.add(`bg-zone-${zone}`);
  }
}

// ============================================================
// SECCIÓN 13: UTILIDADES
// ============================================================

function setButtons(labels, actions) {
  [btn1, btn2, btn3].forEach((btn, i) => {
    btn.disabled    = false;
    btn.textContent = labels[i] ?? "";
    btn.onclick     = actions[i] ?? null;
    if (!actions[i]) btn.disabled = true;
  });
}

function triggerAnimation(el, className, duration) {
  if (!el) return;
  el.classList.add(className);
  setTimeout(() => el.classList.remove(className), duration);
}

// ============================================================
// SECCIÓN 14: INICIALIZACIÓN
// ============================================================

// Aplicar traducciones al DOM estático
applyTranslations();


// Footer
const creditsEl = $("credits-text");
if (creditsEl) {
  creditsEl.innerHTML =
    `© ${new Date().getFullYear()} · Developed by <a href="https://docs.google.com/document/d/1faJBIUmxrH32WPcWyvnGDeZAnvF_WXIrceCtUqZ4Hng/edit?usp=sharing" target="_blank">Packup flash</a>`;
}
