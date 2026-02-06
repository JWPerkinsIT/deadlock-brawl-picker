// ============================================================
// DATA: HEROES
// ============================================================
export const HEROES = [
  { id: "abrams", name: "Abrams", playstyle: ["tank", "gun"], tags: ["sustain", "melee", "tankiness", "close_range"], brawlTier: "A" },
  { id: "bebop", name: "Bebop", playstyle: ["spirit", "support"], tags: ["aoe", "burst", "utility", "spirit_power"], brawlTier: "S" },
  { id: "billy", name: "Billy", playstyle: ["tank", "melee"], tags: ["melee", "tankiness", "sustain", "close_range"], brawlTier: "A" },
  { id: "calico", name: "Calico", playstyle: ["support", "spirit"], tags: ["utility", "sustain", "spirit_power", "cooldown"], brawlTier: "B" },
  { id: "celeste", name: "Celeste", playstyle: ["spirit", "support"], tags: ["aoe", "spirit_power", "utility", "cooldown"], brawlTier: "A" },
  { id: "doorman", name: "Doorman", playstyle: ["hybrid", "utility"], tags: ["utility", "mobility", "spirit_power", "cooldown"], brawlTier: "C" },
  { id: "drifter", name: "Drifter", playstyle: ["assassin", "gun"], tags: ["burst", "close_range", "mobility", "damage"], brawlTier: "C" },
  { id: "dynamo", name: "Dynamo", playstyle: ["tank", "support"], tags: ["aoe", "sustain", "utility", "tankiness"], brawlTier: "S" },
  { id: "graves", name: "Graves", playstyle: ["spirit", "summoner"], tags: ["aoe", "spirit_power", "burst", "utility"], brawlTier: "S" },
  { id: "grey_talon", name: "Grey Talon", playstyle: ["gun", "sniper"], tags: ["long_range", "damage", "burst", "fire_rate"], brawlTier: "B" },
  { id: "haze", name: "Haze", playstyle: ["gun", "assassin"], tags: ["damage", "fire_rate", "burst", "close_range"], brawlTier: "A" },
  { id: "holliday", name: "Holliday", playstyle: ["gun", "assassin"], tags: ["burst", "long_range", "damage", "mobility"], brawlTier: "B" },
  { id: "infernus", name: "Infernus", playstyle: ["spirit", "tank"], tags: ["aoe", "sustain", "spirit_power", "tankiness"], brawlTier: "A" },
  { id: "ivy", name: "Ivy", playstyle: ["support", "spirit"], tags: ["sustain", "utility", "aoe", "spirit_power"], brawlTier: "S" },
  { id: "kelvin", name: "Kelvin", playstyle: ["tank", "spirit"], tags: ["aoe", "tankiness", "spirit_power", "utility"], brawlTier: "A" },
  { id: "lady_geist", name: "Lady Geist", playstyle: ["spirit", "sustain"], tags: ["sustain", "spirit_power", "burst", "aoe"], brawlTier: "S" },
  { id: "lash", name: "Lash", playstyle: ["assassin", "melee"], tags: ["burst", "melee", "mobility", "aoe"], brawlTier: "A" },
  { id: "mcginnis", name: "McGinnis", playstyle: ["spirit", "turret"], tags: ["aoe", "spirit_power", "utility", "damage"], brawlTier: "A" },
  { id: "mirage", name: "Mirage", playstyle: ["hybrid", "spirit"], tags: ["burst", "spirit_power", "damage", "fire_rate"], brawlTier: "C" },
  { id: "mo_krill", name: "Mo & Krill", playstyle: ["tank", "melee"], tags: ["tankiness", "sustain", "melee", "close_range"], brawlTier: "A" },
  { id: "paige", name: "Paige", playstyle: ["support", "spirit"], tags: ["utility", "aoe", "spirit_power", "sustain"], brawlTier: "S" },
  { id: "paradox", name: "Paradox", playstyle: ["hybrid", "utility"], tags: ["burst", "utility", "spirit_power", "cooldown"], brawlTier: "C" },
  { id: "pocket", name: "Pocket", playstyle: ["spirit", "burst"], tags: ["burst", "spirit_power", "aoe", "cooldown"], brawlTier: "B" },
  { id: "rem", name: "Rem", playstyle: ["spirit", "utility"], tags: ["spirit_power", "utility", "cooldown", "aoe"], brawlTier: "B" },
  { id: "seven", name: "Seven", playstyle: ["spirit", "aoe"], tags: ["aoe", "spirit_power", "burst", "utility"], brawlTier: "S" },
  { id: "shiv", name: "Shiv", playstyle: ["assassin", "melee"], tags: ["sustain", "melee", "burst", "close_range"], brawlTier: "A" },
  { id: "silver", name: "Silver", playstyle: ["gun", "hybrid"], tags: ["damage", "fire_rate", "burst", "long_range"], brawlTier: "B" },
  { id: "sinclair", name: "Sinclair", playstyle: ["gun", "spirit"], tags: ["burst", "damage", "spirit_power", "utility"], brawlTier: "B" },
  { id: "vindicta", name: "Vindicta", playstyle: ["gun", "sniper"], tags: ["long_range", "damage", "burst", "fire_rate"], brawlTier: "C" },
  { id: "viscous", name: "Viscous", playstyle: ["tank", "support"], tags: ["tankiness", "utility", "aoe", "sustain"], brawlTier: "A" },
  { id: "vyper", name: "Vyper", playstyle: ["spirit", "assassin"], tags: ["burst", "spirit_power", "mobility", "damage"], brawlTier: "C" },
  { id: "warden", name: "Warden", playstyle: ["tank", "gun"], tags: ["tankiness", "sustain", "damage", "aoe"], brawlTier: "A" },
  { id: "wraith", name: "Wraith", playstyle: ["gun", "burst"], tags: ["burst", "damage", "fire_rate", "mobility"], brawlTier: "B" },
  { id: "yamato", name: "Yamato", playstyle: ["melee", "hybrid"], tags: ["melee", "burst", "sustain", "damage"], brawlTier: "B" },
  { id: "victor", name: "Victor", playstyle: ["gun", "scaling"], tags: ["damage", "fire_rate", "burst", "aoe"], brawlTier: "S" },
  { id: "apollo", name: "Apollo", playstyle: ["gun", "utility"], tags: ["damage", "utility", "fire_rate", "burst"], brawlTier: "B" },
  { id: "venator", name: "Venator", playstyle: ["assassin", "spirit"], tags: ["burst", "spirit_power", "mobility", "close_range"], brawlTier: "B" },
];

// ============================================================
// DATA: ITEMS  (all 172+ standard items + street brawl legendaries)
// ============================================================
// Tags: damage, fire_rate, sustain, mobility, aoe, burst, tankiness, utility,
//       cooldown, spirit_power, melee, close_range, long_range, scaling
// brawlRating: base rating for Street Brawl (S/A/B/C/D)
export const ITEMS = [
  // ---- WEAPON T1 (800) ----
  { id: "close_quarters", name: "Close Quarters", cat: "weapon", tier: 1, active: false, tags: ["close_range", "damage"], brawlRating: "A", desc: "+25% Weapon Damage within 15m" },
  { id: "extended_mag", name: "Extended Magazine", cat: "weapon", tier: 1, active: false, tags: ["fire_rate", "damage"], brawlRating: "B", desc: "+20% Ammo, +8% Weapon Damage" },
  { id: "headshot_booster", name: "Headshot Booster", cat: "weapon", tier: 1, active: false, tags: ["burst", "damage"], brawlRating: "A", desc: "+40 Headshot Bonus Damage" },
  { id: "high_velocity", name: "High-Velocity Rounds", cat: "weapon", tier: 1, active: false, tags: ["damage", "long_range"], brawlRating: "B", desc: "+12% Bullet Velocity, +8% Damage" },
  { id: "monster_rounds", name: "Monster Rounds", cat: "weapon", tier: 1, active: false, tags: ["sustain", "damage"], brawlRating: "C", desc: "Bonus damage/lifesteal vs NPCs" },
  { id: "rapid_rounds", name: "Rapid Rounds", cat: "weapon", tier: 1, active: false, tags: ["fire_rate", "damage"], brawlRating: "A", desc: "+9% Fire Rate" },
  { id: "restorative_shot", name: "Restorative Shot", cat: "weapon", tier: 1, active: false, tags: ["sustain", "damage"], brawlRating: "B", desc: "Heal on hero hit" },

  // ---- WEAPON T2 (1600) ----
  { id: "active_reload", name: "Active Reload", cat: "weapon", tier: 2, active: false, tags: ["fire_rate", "burst", "damage"], brawlRating: "A", desc: "Bonus fire rate/damage after reload" },
  { id: "backstabber", name: "Backstabber", cat: "weapon", tier: 2, active: false, tags: ["burst", "damage", "close_range"], brawlRating: "B", desc: "Bonus damage from behind" },
  { id: "fleetfoot", name: "Fleetfoot", cat: "weapon", tier: 2, active: true, tags: ["mobility", "damage"], brawlRating: "A", desc: "Active: dash + fire rate boost" },
  { id: "intensifying_mag", name: "Intensifying Magazine", cat: "weapon", tier: 2, active: false, tags: ["damage", "scaling", "fire_rate"], brawlRating: "B", desc: "Damage ramps during magazine" },
  { id: "kinetic_dash", name: "Kinetic Dash", cat: "weapon", tier: 2, active: false, tags: ["mobility", "damage"], brawlRating: "A", desc: "Bonus damage after dash" },
  { id: "long_range", name: "Long Range", cat: "weapon", tier: 2, active: false, tags: ["long_range", "damage"], brawlRating: "C", desc: "+18% Damage beyond 25m" },
  { id: "melee_charge", name: "Melee Charge", cat: "weapon", tier: 2, active: false, tags: ["melee", "burst", "damage"], brawlRating: "B", desc: "Bonus melee damage after sprint" },
  { id: "mystic_shot", name: "Mystic Shot", cat: "weapon", tier: 2, active: false, tags: ["spirit_power", "damage"], brawlRating: "A", desc: "Bullets apply spirit damage" },
  { id: "opening_rounds", name: "Opening Rounds", cat: "weapon", tier: 2, active: false, tags: ["burst", "damage"], brawlRating: "B", desc: "First bullets in magazine deal bonus" },
  { id: "recharging_rush", name: "Recharging Rush", cat: "weapon", tier: 2, active: false, tags: ["mobility", "cooldown"], brawlRating: "B", desc: "Dash recharges faster" },
  { id: "slowing_bullets", name: "Slowing Bullets", cat: "weapon", tier: 2, active: false, tags: ["utility", "damage"], brawlRating: "A", desc: "Bullets slow enemies" },
  { id: "spirit_shredder", name: "Spirit Shredder Bullets", cat: "weapon", tier: 2, active: false, tags: ["utility", "damage", "spirit_power"], brawlRating: "B", desc: "Reduces enemy spirit resist" },
  { id: "split_shot", name: "Split Shot", cat: "weapon", tier: 2, active: true, tags: ["aoe", "damage"], brawlRating: "B", desc: "Bullets hit additional targets" },
  { id: "swift_striker", name: "Swift Striker", cat: "weapon", tier: 2, active: false, tags: ["fire_rate", "damage"], brawlRating: "A", desc: "+22% Fire Rate" },
  { id: "titanic_mag", name: "Titanic Magazine", cat: "weapon", tier: 2, active: false, tags: ["damage", "tankiness"], brawlRating: "B", desc: "Bonus damage from max HP" },
  { id: "weakening_headshot", name: "Weakening Headshot", cat: "weapon", tier: 2, active: false, tags: ["burst", "utility"], brawlRating: "B", desc: "Headshots reduce enemy damage" },

  // ---- WEAPON T3 (3200) ----
  { id: "alchemical_fire", name: "Alchemical Fire", cat: "weapon", tier: 3, active: true, tags: ["aoe", "burst", "damage"], brawlRating: "S", desc: "Throw AoE fire dealing DPS" },
  { id: "ballistic_enchant", name: "Ballistic Enchantment", cat: "weapon", tier: 3, active: false, tags: ["damage", "spirit_power"], brawlRating: "A", desc: "Imbue bullets with spirit damage" },
  { id: "berserker", name: "Berserker", cat: "weapon", tier: 3, active: false, tags: ["damage", "sustain", "fire_rate"], brawlRating: "S", desc: "Bonus damage/lifesteal at low HP" },
  { id: "blood_tribute", name: "Blood Tribute", cat: "weapon", tier: 3, active: true, tags: ["sustain", "damage", "burst"], brawlRating: "A", desc: "Active: heal based on damage dealt" },
  { id: "burst_fire", name: "Burst Fire", cat: "weapon", tier: 3, active: false, tags: ["burst", "damage", "fire_rate"], brawlRating: "A", desc: "Weapon fires in bursts" },
  { id: "cultist_sacrifice", name: "Cultist Sacrifice", cat: "weapon", tier: 3, active: true, tags: ["burst", "spirit_power", "damage"], brawlRating: "B", desc: "Sacrifice HP for spirit power" },
  { id: "escalating_resilience", name: "Escalating Resilience", cat: "weapon", tier: 3, active: false, tags: ["tankiness", "sustain"], brawlRating: "A", desc: "Gain resist stacks in combat" },
  { id: "express_shot", name: "Express Shot", cat: "weapon", tier: 3, active: false, tags: ["damage", "burst", "fire_rate"], brawlRating: "A", desc: "Bonus damage + fire rate" },
  { id: "headhunter", name: "Headhunter", cat: "weapon", tier: 3, active: false, tags: ["burst", "damage"], brawlRating: "A", desc: "Headshots deal massive bonus" },
  { id: "heroic_aura", name: "Heroic Aura", cat: "weapon", tier: 3, active: true, tags: ["aoe", "utility", "damage"], brawlRating: "S", desc: "Aura boosts nearby ally damage" },
  { id: "hollow_point", name: "Hollow Point", cat: "weapon", tier: 3, active: false, tags: ["burst", "damage"], brawlRating: "A", desc: "Bonus damage to high-HP targets" },
  { id: "hunters_aura", name: "Hunter's Aura", cat: "weapon", tier: 3, active: false, tags: ["aoe", "utility", "damage"], brawlRating: "S", desc: "Reduce nearby enemy armor" },
  { id: "point_blank", name: "Point Blank", cat: "weapon", tier: 3, active: false, tags: ["close_range", "burst", "damage"], brawlRating: "A", desc: "+45% damage within 14m" },
  { id: "sharpshooter", name: "Sharpshooter", cat: "weapon", tier: 3, active: false, tags: ["long_range", "damage"], brawlRating: "B", desc: "Bonus at range, stacking accuracy" },
  { id: "spirit_rend", name: "Spirit Rend", cat: "weapon", tier: 3, active: false, tags: ["spirit_power", "damage", "burst"], brawlRating: "A", desc: "Headshots deal bonus spirit damage" },
  { id: "tesla_bullets", name: "Tesla Bullets", cat: "weapon", tier: 3, active: false, tags: ["aoe", "damage"], brawlRating: "S", desc: "Bullets chain to nearby enemies" },
  { id: "toxic_bullets", name: "Toxic Bullets", cat: "weapon", tier: 3, active: false, tags: ["damage", "utility", "sustain"], brawlRating: "A", desc: "Bullets apply anti-heal + DPS" },
  { id: "weighted_shots", name: "Weighted Shots", cat: "weapon", tier: 3, active: false, tags: ["burst", "utility", "damage"], brawlRating: "B", desc: "Shots slow and deal bonus" },

  // ---- WEAPON T4 (6400) ----
  { id: "armor_piercing", name: "Armor Piercing Rounds", cat: "weapon", tier: 4, active: false, tags: ["damage", "burst"], brawlRating: "A", desc: "Ignore % bullet resist" },
  { id: "capacitor", name: "Capacitor", cat: "weapon", tier: 4, active: true, tags: ["aoe", "burst", "spirit_power"], brawlRating: "A", desc: "Active: AoE spirit damage burst" },
  { id: "crippling_headshot", name: "Crippling Headshot", cat: "weapon", tier: 4, active: false, tags: ["burst", "utility", "damage"], brawlRating: "S", desc: "Headshots massively slow + reduce" },
  { id: "crushing_fists", name: "Crushing Fists", cat: "weapon", tier: 4, active: false, tags: ["melee", "burst", "damage"], brawlRating: "A", desc: "Massive melee damage boost" },
  { id: "frenzy", name: "Frenzy", cat: "weapon", tier: 4, active: false, tags: ["fire_rate", "damage", "sustain"], brawlRating: "S", desc: "Huge fire rate + lifesteal" },
  { id: "glass_cannon", name: "Glass Cannon", cat: "weapon", tier: 4, active: false, tags: ["damage", "burst"], brawlRating: "B", desc: "+70% weapon damage, -20% HP" },
  { id: "lucky_shot", name: "Lucky Shot", cat: "weapon", tier: 4, active: false, tags: ["burst", "damage"], brawlRating: "A", desc: "Chance for double damage" },
  { id: "ricochet", name: "Ricochet", cat: "weapon", tier: 4, active: false, tags: ["aoe", "damage"], brawlRating: "S", desc: "Bullets bounce to nearby targets" },
  { id: "shadow_weave", name: "Shadow Weave", cat: "weapon", tier: 4, active: true, tags: ["mobility", "burst", "damage"], brawlRating: "A", desc: "Active: invis + bonus damage" },
  { id: "silencer", name: "Silencer", cat: "weapon", tier: 4, active: false, tags: ["utility", "burst", "damage"], brawlRating: "S", desc: "Bullets silence on hit" },
  { id: "spellslinger", name: "Spellslinger", cat: "weapon", tier: 4, active: false, tags: ["spirit_power", "damage"], brawlRating: "A", desc: "Gun damage boosts spirit and vice versa" },
  { id: "spiritual_overflow", name: "Spiritual Overflow", cat: "weapon", tier: 4, active: false, tags: ["spirit_power", "damage", "burst"], brawlRating: "A", desc: "Spirit power scales weapon damage" },

  // ---- WEAPON LEGENDARY (Street Brawl) ----
  { id: "haunting_shot", name: "Haunting Shot", cat: "weapon", tier: 5, active: false, tags: ["burst", "spirit_power", "utility", "aoe"], brawlRating: "S", desc: "Bullet deals spirit dmg based on enemy HP, pierces, reduces healing/speed/damage", legendary: true },
  { id: "infinite_rounds", name: "Infinite Rounds", cat: "weapon", tier: 5, active: false, tags: ["damage", "fire_rate", "burst"], brawlRating: "S", desc: "Chance for unavoidable piercing bullets, infinite ammo", legendary: true },
  { id: "runed_gauntlets", name: "Runed Gauntlets", cat: "weapon", tier: 5, active: false, tags: ["melee", "cooldown", "burst"], brawlRating: "S", desc: "Melee pierces parry, heavy melee reduces cooldowns", legendary: true },

  // ---- VITALITY T1 (800) ----
  { id: "extra_health", name: "Extra Health", cat: "vitality", tier: 1, active: false, tags: ["tankiness"], brawlRating: "B", desc: "+125 Bonus Health" },
  { id: "extra_regen", name: "Extra Regen", cat: "vitality", tier: 1, active: false, tags: ["sustain"], brawlRating: "C", desc: "+3 HP Regen" },
  { id: "extra_stamina", name: "Extra Stamina", cat: "vitality", tier: 1, active: false, tags: ["mobility"], brawlRating: "B", desc: "+1 Stamina, +10% stamina regen" },
  { id: "healing_rite", name: "Healing Rite", cat: "vitality", tier: 1, active: true, tags: ["sustain", "utility"], brawlRating: "A", desc: "Active: heal over time" },
  { id: "melee_lifesteal", name: "Melee Lifesteal", cat: "vitality", tier: 1, active: false, tags: ["sustain", "melee"], brawlRating: "B", desc: "+30% Melee Lifesteal" },
  { id: "rebuttal", name: "Rebuttal", cat: "vitality", tier: 1, active: false, tags: ["tankiness", "burst"], brawlRating: "A", desc: "Parry returns bonus damage" },
  { id: "sprint_boots", name: "Sprint Boots", cat: "vitality", tier: 1, active: false, tags: ["mobility"], brawlRating: "B", desc: "+2 Sprint Speed" },

  // ---- VITALITY T2 (1600) ----
  { id: "battle_vest", name: "Battle Vest", cat: "vitality", tier: 2, active: false, tags: ["tankiness"], brawlRating: "A", desc: "+20% Bullet Resist" },
  { id: "bullet_lifesteal", name: "Bullet Lifesteal", cat: "vitality", tier: 2, active: false, tags: ["sustain", "damage"], brawlRating: "A", desc: "+24% Bullet Lifesteal" },
  { id: "debuff_reducer", name: "Debuff Reducer", cat: "vitality", tier: 2, active: false, tags: ["utility", "tankiness"], brawlRating: "A", desc: "+35% Debuff Duration Reduce" },
  { id: "enchanters_emblem", name: "Enchanter's Emblem", cat: "vitality", tier: 2, active: false, tags: ["spirit_power", "sustain"], brawlRating: "B", desc: "Spirit lifesteal + spirit power" },
  { id: "enduring_speed", name: "Enduring Speed", cat: "vitality", tier: 2, active: false, tags: ["mobility", "sustain"], brawlRating: "A", desc: "+1.5 Move Speed, +6% Regen" },
  { id: "guardian_ward", name: "Guardian Ward", cat: "vitality", tier: 2, active: true, tags: ["utility", "tankiness"], brawlRating: "B", desc: "Active: shield an ally" },
  { id: "healbane", name: "Healbane", cat: "vitality", tier: 2, active: false, tags: ["utility", "damage"], brawlRating: "A", desc: "-40% enemy healing on hit" },
  { id: "healing_booster", name: "Healing Booster", cat: "vitality", tier: 2, active: false, tags: ["sustain"], brawlRating: "B", desc: "+30% Healing Effectiveness" },
  { id: "reactive_barrier", name: "Reactive Barrier", cat: "vitality", tier: 2, active: false, tags: ["tankiness", "utility"], brawlRating: "A", desc: "Shield when hit at low HP" },
  { id: "restorative_locket", name: "Restorative Locket", cat: "vitality", tier: 2, active: true, tags: ["sustain", "utility"], brawlRating: "A", desc: "Active: heal self and ally" },
  { id: "return_fire", name: "Return Fire", cat: "vitality", tier: 2, active: true, tags: ["tankiness", "damage"], brawlRating: "A", desc: "Active: reflect bullet damage" },
  { id: "spirit_lifesteal", name: "Spirit Lifesteal", cat: "vitality", tier: 2, active: false, tags: ["sustain", "spirit_power"], brawlRating: "A", desc: "+23% Spirit Lifesteal" },
  { id: "spirit_shielding", name: "Spirit Shielding", cat: "vitality", tier: 2, active: false, tags: ["tankiness"], brawlRating: "A", desc: "+20% Spirit Resist" },
  { id: "weapon_shielding", name: "Weapon Shielding", cat: "vitality", tier: 2, active: false, tags: ["tankiness"], brawlRating: "B", desc: "+20% Bullet Resist" },

  // ---- VITALITY T3 (3200) ----
  { id: "bullet_resilience", name: "Bullet Resilience", cat: "vitality", tier: 3, active: false, tags: ["tankiness"], brawlRating: "A", desc: "Bullet resist scales with lost HP" },
  { id: "counterspell", name: "Counterspell", cat: "vitality", tier: 3, active: false, tags: ["tankiness", "utility"], brawlRating: "A", desc: "Block first ability hit" },
  { id: "dispel_magic", name: "Dispel Magic", cat: "vitality", tier: 3, active: true, tags: ["utility"], brawlRating: "A", desc: "Active: remove enemy buffs" },
  { id: "fortitude", name: "Fortitude", cat: "vitality", tier: 3, active: false, tags: ["tankiness", "sustain"], brawlRating: "S", desc: "+350 HP, regen on low HP" },
  { id: "fury_trance", name: "Fury Trance", cat: "vitality", tier: 3, active: true, tags: ["fire_rate", "damage", "sustain"], brawlRating: "A", desc: "Active: massive fire rate boost" },
  { id: "healing_nova", name: "Healing Nova", cat: "vitality", tier: 3, active: true, tags: ["sustain", "aoe", "utility"], brawlRating: "S", desc: "Active: AoE team heal" },
  { id: "lifestrike", name: "Lifestrike", cat: "vitality", tier: 3, active: false, tags: ["sustain", "melee", "burst"], brawlRating: "A", desc: "Melee heals based on damage" },
  { id: "majestic_leap", name: "Majestic Leap", cat: "vitality", tier: 3, active: true, tags: ["mobility", "utility"], brawlRating: "A", desc: "Active: high jump" },
  { id: "metal_skin", name: "Metal Skin", cat: "vitality", tier: 3, active: true, tags: ["tankiness"], brawlRating: "A", desc: "Active: immune to bullets briefly" },
  { id: "rescue_beam", name: "Rescue Beam", cat: "vitality", tier: 3, active: true, tags: ["utility", "sustain"], brawlRating: "S", desc: "Active: heal ally over time" },
  { id: "spirit_resilience", name: "Spirit Resilience", cat: "vitality", tier: 3, active: false, tags: ["tankiness"], brawlRating: "A", desc: "Spirit resist scales with lost HP" },
  { id: "stamina_mastery", name: "Stamina Mastery", cat: "vitality", tier: 3, active: false, tags: ["mobility"], brawlRating: "B", desc: "+2 Stamina, faster regen" },
  { id: "trophy_collector", name: "Trophy Collector", cat: "vitality", tier: 3, active: false, tags: ["scaling", "damage"], brawlRating: "B", desc: "Gain stats on kill" },
  { id: "veil_walker", name: "Veil Walker", cat: "vitality", tier: 3, active: false, tags: ["mobility", "burst"], brawlRating: "B", desc: "Sprint through enemies, bonus dmg" },
  { id: "warp_stone", name: "Warp Stone", cat: "vitality", tier: 3, active: true, tags: ["mobility", "burst"], brawlRating: "A", desc: "Active: short teleport" },

  // ---- VITALITY T4 (6400) ----
  { id: "cheat_death", name: "Cheat Death", cat: "vitality", tier: 4, active: false, tags: ["tankiness", "sustain"], brawlRating: "S", desc: "Survive lethal damage once" },
  { id: "colossus", name: "Colossus", cat: "vitality", tier: 4, active: true, tags: ["tankiness", "aoe"], brawlRating: "S", desc: "Active: massive HP + slow aura" },
  { id: "durable", name: "Durable", cat: "vitality", tier: 4, active: false, tags: ["tankiness", "sustain"], brawlRating: "A", desc: "Huge HP + resists" },
  { id: "inhibitor", name: "Inhibitor", cat: "vitality", tier: 4, active: false, tags: ["utility", "aoe"], brawlRating: "S", desc: "Reduce enemy healing in area" },
  { id: "leech", name: "Leech", cat: "vitality", tier: 4, active: false, tags: ["sustain", "damage"], brawlRating: "S", desc: "All damage heals you" },
  { id: "phantom_strike", name: "Phantom Strike", cat: "vitality", tier: 4, active: true, tags: ["mobility", "burst", "close_range"], brawlRating: "A", desc: "Active: teleport to enemy" },
  { id: "siphon_bullets", name: "Siphon Bullets", cat: "vitality", tier: 4, active: false, tags: ["sustain", "damage"], brawlRating: "A", desc: "Steal max HP on hit" },
  { id: "soul_rebirth", name: "Soul Rebirth", cat: "vitality", tier: 4, active: false, tags: ["tankiness", "sustain"], brawlRating: "S", desc: "Revive on death" },
  { id: "unstoppable", name: "Unstoppable", cat: "vitality", tier: 4, active: true, tags: ["utility", "tankiness"], brawlRating: "S", desc: "Active: immune to CC" },

  // ---- VITALITY LEGENDARY (Street Brawl) ----
  { id: "celestial_blessing", name: "Celestial Blessing", cat: "vitality", tier: 5, active: true, tags: ["sustain", "utility", "aoe", "mobility"], brawlRating: "S", desc: "Cleanse + heal + stamina + speed for whole team", legendary: true },

  // ---- SPIRIT T1 (800) ----
  { id: "ammo_scavenger", name: "Ammo Scavenger", cat: "spirit", tier: 1, active: false, tags: ["sustain", "damage"], brawlRating: "C", desc: "Ammo on soul pickup" },
  { id: "extra_charge", name: "Extra Charge", cat: "spirit", tier: 1, active: false, tags: ["cooldown", "utility"], brawlRating: "A", desc: "+1 Ability Charge" },
  { id: "extra_spirit", name: "Extra Spirit", cat: "spirit", tier: 1, active: false, tags: ["spirit_power"], brawlRating: "B", desc: "+8 Spirit Power" },
  { id: "infuser", name: "Infuser", cat: "spirit", tier: 1, active: false, tags: ["spirit_power", "cooldown"], brawlRating: "B", desc: "+8 Spirit Power, -6% Cooldown" },
  { id: "mystic_burst", name: "Mystic Burst", cat: "spirit", tier: 1, active: false, tags: ["burst", "spirit_power"], brawlRating: "A", desc: "Abilities deal bonus burst" },
  { id: "spirit_strike", name: "Spirit Strike", cat: "spirit", tier: 1, active: false, tags: ["melee", "spirit_power"], brawlRating: "B", desc: "Melee applies spirit damage" },
  { id: "withering_whip", name: "Withering Whip", cat: "spirit", tier: 1, active: false, tags: ["utility", "damage"], brawlRating: "A", desc: "Ability hit reduces enemy fire rate" },

  // ---- SPIRIT T2 (1600) ----
  { id: "bullet_resist_shred", name: "Bullet Resist Shredder", cat: "spirit", tier: 2, active: false, tags: ["utility", "damage"], brawlRating: "A", desc: "Abilities reduce bullet resist" },
  { id: "cold_front", name: "Cold Front", cat: "spirit", tier: 2, active: false, tags: ["aoe", "utility", "spirit_power"], brawlRating: "A", desc: "Abilities slow enemies" },
  { id: "decay", name: "Decay", cat: "spirit", tier: 2, active: false, tags: ["utility", "damage", "spirit_power"], brawlRating: "A", desc: "Abilities reduce enemy healing" },
  { id: "duration_extender", name: "Duration Extender", cat: "spirit", tier: 2, active: false, tags: ["utility", "spirit_power"], brawlRating: "A", desc: "+18% Ability Duration" },
  { id: "improved_burst", name: "Improved Burst", cat: "spirit", tier: 2, active: false, tags: ["burst", "spirit_power"], brawlRating: "A", desc: "+20% Ability Damage" },
  { id: "improved_cooldown", name: "Improved Cooldown", cat: "spirit", tier: 2, active: false, tags: ["cooldown"], brawlRating: "A", desc: "-12% Cooldowns" },
  { id: "improved_reach", name: "Improved Reach", cat: "spirit", tier: 2, active: false, tags: ["utility", "spirit_power"], brawlRating: "B", desc: "+20% Ability Range" },
  { id: "quicksilver_reload", name: "Quicksilver Reload", cat: "spirit", tier: 2, active: false, tags: ["fire_rate", "spirit_power"], brawlRating: "B", desc: "Spirit power after reload" },
  { id: "slowing_hex", name: "Slowing Hex", cat: "spirit", tier: 2, active: false, tags: ["utility", "spirit_power"], brawlRating: "A", desc: "Abilities slow targets" },
  { id: "suppressor", name: "Suppressor", cat: "spirit", tier: 2, active: false, tags: ["utility", "damage"], brawlRating: "A", desc: "Reduce enemy damage on ability hit" },
  { id: "torment_pulse", name: "Torment Pulse", cat: "spirit", tier: 2, active: false, tags: ["aoe", "spirit_power", "damage"], brawlRating: "A", desc: "AoE spirit DPS around you" },
  { id: "withering_reach", name: "Withering Reach", cat: "spirit", tier: 2, active: false, tags: ["utility", "spirit_power"], brawlRating: "B", desc: "Abilities reduce enemy spirit resist" },

  // ---- SPIRIT T3 (3200) ----
  { id: "arcane_surge", name: "Arcane Surge", cat: "spirit", tier: 3, active: false, tags: ["spirit_power", "burst", "cooldown"], brawlRating: "S", desc: "Ability hit grants spirit power burst" },
  { id: "ethereal_shift", name: "Ethereal Shift", cat: "spirit", tier: 3, active: true, tags: ["utility", "tankiness"], brawlRating: "A", desc: "Active: become invulnerable briefly" },
  { id: "improved_spirit", name: "Improved Spirit", cat: "spirit", tier: 3, active: false, tags: ["spirit_power"], brawlRating: "A", desc: "+25 Spirit Power" },
  { id: "knockdown", name: "Knockdown", cat: "spirit", tier: 3, active: true, tags: ["utility", "aoe"], brawlRating: "A", desc: "Active: AoE stun" },
  { id: "mystic_reverb", name: "Mystic Reverb", cat: "spirit", tier: 3, active: false, tags: ["burst", "spirit_power", "aoe"], brawlRating: "A", desc: "Abilities echo for bonus damage" },
  { id: "mystic_vuln", name: "Mystic Vulnerability", cat: "spirit", tier: 3, active: false, tags: ["utility", "damage", "spirit_power"], brawlRating: "A", desc: "Abilities amplify spirit damage taken" },
  { id: "rapid_recharge", name: "Rapid Recharge", cat: "spirit", tier: 3, active: false, tags: ["cooldown"], brawlRating: "A", desc: "-20% Cooldowns" },
  { id: "silence_glyph", name: "Silence Glyph", cat: "spirit", tier: 3, active: false, tags: ["utility", "burst"], brawlRating: "S", desc: "Abilities silence on hit" },
  { id: "superior_cooldown", name: "Superior Cooldown", cat: "spirit", tier: 3, active: false, tags: ["cooldown"], brawlRating: "A", desc: "-24% Cooldowns" },
  { id: "superior_duration", name: "Superior Duration", cat: "spirit", tier: 3, active: false, tags: ["utility", "spirit_power"], brawlRating: "A", desc: "+30% Ability Duration" },
  { id: "surge_of_power", name: "Surge of Power", cat: "spirit", tier: 3, active: false, tags: ["spirit_power", "fire_rate", "mobility"], brawlRating: "A", desc: "Ability hit grants speed + fire rate" },
  { id: "torrent", name: "Torrent", cat: "spirit", tier: 3, active: true, tags: ["aoe", "spirit_power", "burst"], brawlRating: "A", desc: "Active: AoE spirit damage wave" },

  // ---- SPIRIT T4 (6400) ----
  { id: "boundless_spirit", name: "Boundless Spirit", cat: "spirit", tier: 4, active: false, tags: ["spirit_power", "tankiness"], brawlRating: "S", desc: "+50 Spirit Power, +200 HP" },
  { id: "curse", name: "Curse", cat: "spirit", tier: 4, active: false, tags: ["utility", "burst", "spirit_power"], brawlRating: "S", desc: "Abilities curse targets, amplifying damage" },
  { id: "diviners_kevlar", name: "Diviner's Kevlar", cat: "spirit", tier: 4, active: false, tags: ["tankiness", "spirit_power"], brawlRating: "A", desc: "Spirit power + bullet resist" },
  { id: "echo_shard", name: "Echo Shard", cat: "spirit", tier: 4, active: true, tags: ["cooldown", "burst"], brawlRating: "S", desc: "Active: reset ability cooldown" },
  { id: "escalating_exposure", name: "Escalating Exposure", cat: "spirit", tier: 4, active: false, tags: ["utility", "damage", "spirit_power"], brawlRating: "A", desc: "Abilities stack spirit damage amp" },
  { id: "magic_carpet", name: "Magic Carpet", cat: "spirit", tier: 4, active: true, tags: ["mobility", "spirit_power"], brawlRating: "B", desc: "Active: fly on a carpet" },
  { id: "mystic_reach", name: "Mystic Reach", cat: "spirit", tier: 4, active: false, tags: ["spirit_power", "utility"], brawlRating: "A", desc: "+30% Ability Range + power" },
  { id: "refresher", name: "Refresher", cat: "spirit", tier: 4, active: true, tags: ["cooldown", "burst"], brawlRating: "S", desc: "Active: reset ALL cooldowns" },
];

// ============================================================
// HERO-SPECIFIC ITEM SYNERGY OVERRIDES
// Format: { heroId: { itemId: rating } }
// Only overrides that differ from the calculated default
// ============================================================
export const HERO_OVERRIDES = {
  bebop: { heroic_aura: "S", tesla_bullets: "S", alchemical_fire: "S", improved_burst: "S", mystic_reverb: "S", echo_shard: "S", silence_glyph: "S", arcane_surge: "S", refresher: "S", spirit_lifesteal: "S", healing_nova: "S" },
  seven: { echo_shard: "S", refresher: "S", improved_burst: "S", arcane_surge: "S", silence_glyph: "S", superior_cooldown: "S", boundless_spirit: "S", curse: "S", tesla_bullets: "A", ricochet: "B" },
  dynamo: { healing_nova: "S", rescue_beam: "S", fortitude: "S", colossus: "S", echo_shard: "S", improved_burst: "S", superior_cooldown: "S", unstoppable: "S" },
  lady_geist: { spirit_lifesteal: "S", leech: "S", improved_burst: "S", arcane_surge: "S", boundless_spirit: "S", fortitude: "S", healing_booster: "S", curse: "S" },
  haze: { frenzy: "S", ricochet: "S", lucky_shot: "S", crippling_headshot: "S", bullet_lifesteal: "S", leech: "S", shadow_weave: "S", silencer: "S", armor_piercing: "S", swift_striker: "S" },
  victor: { frenzy: "S", ricochet: "S", tesla_bullets: "S", silencer: "S", crippling_headshot: "S", bullet_lifesteal: "S", armor_piercing: "S", headshot_booster: "S" },
  abrams: { fortitude: "S", leech: "S", colossus: "S", soul_rebirth: "S", cheat_death: "S", lifestrike: "S", crushing_fists: "S", unstoppable: "S", melee_lifesteal: "A" },
  mo_krill: { fortitude: "S", leech: "S", colossus: "S", unstoppable: "S", cheat_death: "S", soul_rebirth: "S", lifestrike: "S", melee_lifesteal: "A" },
  shiv: { leech: "S", berserker: "S", lifestrike: "S", phantom_strike: "S", warp_stone: "S", toxic_bullets: "A", siphon_bullets: "S" },
  ivy: { healing_nova: "S", rescue_beam: "S", improved_cooldown: "S", superior_cooldown: "S", echo_shard: "S", improved_burst: "S", boundless_spirit: "S" },
  paige: { improved_burst: "S", arcane_surge: "S", echo_shard: "S", boundless_spirit: "S", superior_cooldown: "S", healing_nova: "S", knockdown: "S", silence_glyph: "S" },
  graves: { echo_shard: "S", refresher: "S", improved_burst: "S", arcane_surge: "S", boundless_spirit: "S", spirit_lifesteal: "S" },
  lash: { warp_stone: "S", phantom_strike: "S", crushing_fists: "S", majestic_leap: "S", improved_burst: "S", knockdown: "S", echo_shard: "S" },
  warden: { fortitude: "S", colossus: "S", leech: "S", frenzy: "S", berserker: "S", healing_booster: "S" },
  infernus: { spirit_lifesteal: "S", improved_burst: "S", arcane_surge: "S", fortitude: "S", leech: "S", torment_pulse: "S" },
};
