import { useState, useMemo, useCallback, useEffect } from "react";
import { Search, ChevronRight, RotateCcw, Swords, Shield, Sparkles, Star, Zap, Target, Trophy, Info, X, Check, ArrowRight, Filter, Flame, Crown } from "lucide-react";

// ============================================================
// DATA: HEROES
// ============================================================
const HEROES = [
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
const ITEMS = [
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
const HERO_OVERRIDES = {
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

// ============================================================
// SCORING ENGINE
// ============================================================
const RATING_SCORES = { S: 10, A: 7, B: 5, C: 3, D: 1 };
const TIER_NAMES = { 1: "I", 2: "II", 3: "III", 4: "IV", 5: "Legendary" };
const TIER_COSTS = { 1: 800, 2: 1600, 3: 3200, 4: 6400, 5: 9999 };
const CAT_COLORS = { weapon: "#d4783b", vitality: "#6dbf6a", spirit: "#b87fd4" };
const CAT_LABELS = { weapon: "Weapon", vitality: "Vitality", spirit: "Spirit" };
const RATING_COLORS = { S: "#ff4757", A: "#ffa502", B: "#e8a535", C: "#7bed9f", D: "#636e72" };

const ROUND_TIER_WEIGHTS = {
  1: { 1: 0.6, 2: 0.3, 3: 0.1, 4: 0, 5: 0 },
  2: { 1: 0.3, 2: 0.4, 3: 0.2, 4: 0.08, 5: 0.02 },
  3: { 1: 0.1, 2: 0.3, 3: 0.35, 4: 0.2, 5: 0.05 },
  4: { 1: 0.05, 2: 0.15, 3: 0.35, 4: 0.35, 5: 0.1 },
  5: { 1: 0, 2: 0.1, 3: 0.3, 4: 0.45, 5: 0.15 },
};

function getItemRating(item, hero) {
  if (!hero) return item.brawlRating;
  const overrides = HERO_OVERRIDES[hero.id];
  if (overrides && overrides[item.id]) return overrides[item.id];
  // Tag-based synergy calculation
  const sharedTags = item.tags.filter((t) => hero.tags.includes(t));
  const synergy = sharedTags.length;
  const baseScore = RATING_SCORES[item.brawlRating] || 5;
  const adjusted = baseScore + synergy * 0.8;
  if (adjusted >= 10) return "S";
  if (adjusted >= 7) return "A";
  if (adjusted >= 5) return "B";
  if (adjusted >= 3) return "C";
  return "D";
}

function getItemScore(item, hero, round, currentBuild = []) {
  const rating = getItemRating(item, hero);
  let score = RATING_SCORES[rating] || 5;
  // Round context bonus - higher tier items are worth more in later rounds
  const tierWeight = ROUND_TIER_WEIGHTS[round]?.[item.tier] || 0;
  score += tierWeight * 3;
  // Legendary always-pick bonus
  if (item.legendary) score += 5;
  // Enhanced items bonus (simulated)
  if (item.enhanced) score += 3;
  // Build diversity bonus - prefer items from categories you have less of
  const catCounts = {};
  currentBuild.forEach((b) => { catCounts[b.cat] = (catCounts[b.cat] || 0) + 1; });
  const thisCatCount = catCounts[item.cat] || 0;
  score -= thisCatCount * 0.5;
  return Math.round(score * 10) / 10;
}

// ============================================================
// STYLES (embedded for artifact)
// ============================================================
const FONT_URL = "https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Barlow:wght@300;400;500;600;700&display=swap";

const styles = {
  app: {
    fontFamily: "'Barlow', sans-serif",
    background: "linear-gradient(180deg, #07080c 0%, #0d0f15 50%, #0a0c11 100%)",
    color: "#e2e0dc",
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
  },
  header: {
    background: "linear-gradient(180deg, rgba(232,165,53,0.08) 0%, transparent 100%)",
    borderBottom: "1px solid rgba(232,165,53,0.15)",
    padding: "16px 20px",
    position: "relative",
    zIndex: 10,
  },
  title: {
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: "28px",
    fontWeight: 700,
    color: "#e8a535",
    letterSpacing: "2px",
    textTransform: "uppercase",
    margin: 0,
    lineHeight: 1.1,
  },
  subtitle: {
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "rgba(232,165,53,0.6)",
    letterSpacing: "3px",
    textTransform: "uppercase",
    margin: 0,
  },
  card: {
    background: "rgba(19,21,27,0.9)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "8px",
    padding: "16px",
    backdropFilter: "blur(10px)",
  },
  glowCard: (color) => ({
    background: "rgba(19,21,27,0.95)",
    border: `1px solid ${color}33`,
    borderRadius: "8px",
    padding: "12px",
    boxShadow: `0 0 20px ${color}11`,
    transition: "all 0.2s ease",
  }),
  ratingBadge: (rating) => ({
    fontFamily: "'Rajdhani', sans-serif",
    fontWeight: 700,
    fontSize: "14px",
    color: RATING_COLORS[rating] || "#666",
    background: `${RATING_COLORS[rating] || "#666"}18`,
    border: `1px solid ${RATING_COLORS[rating] || "#666"}44`,
    borderRadius: "4px",
    padding: "2px 8px",
    minWidth: "28px",
    textAlign: "center",
    display: "inline-block",
  }),
  catBadge: (cat) => ({
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: "11px",
    fontWeight: 600,
    color: CAT_COLORS[cat],
    background: `${CAT_COLORS[cat]}15`,
    border: `1px solid ${CAT_COLORS[cat]}33`,
    borderRadius: "3px",
    padding: "1px 6px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  }),
  tierBadge: (tier) => ({
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: "11px",
    fontWeight: 600,
    color: tier === 5 ? "#e8a535" : "#999",
    background: tier === 5 ? "rgba(232,165,53,0.15)" : "rgba(255,255,255,0.05)",
    border: `1px solid ${tier === 5 ? "rgba(232,165,53,0.3)" : "rgba(255,255,255,0.1)"}`,
    borderRadius: "3px",
    padding: "1px 6px",
  }),
  btn: (active) => ({
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: "13px",
    fontWeight: 600,
    color: active ? "#0a0b0f" : "#999",
    background: active ? "#e8a535" : "rgba(255,255,255,0.05)",
    border: `1px solid ${active ? "#e8a535" : "rgba(255,255,255,0.1)"}`,
    borderRadius: "6px",
    padding: "6px 14px",
    cursor: "pointer",
    transition: "all 0.15s ease",
    textTransform: "uppercase",
    letterSpacing: "1px",
    whiteSpace: "nowrap",
  }),
  input: {
    fontFamily: "'Barlow', sans-serif",
    fontSize: "14px",
    color: "#e2e0dc",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "6px",
    padding: "8px 12px 8px 36px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
};

// ============================================================
// COMPONENTS
// ============================================================

function CatIcon({ cat, size = 16 }) {
  const color = CAT_COLORS[cat];
  if (cat === "weapon") return <Swords size={size} color={color} />;
  if (cat === "vitality") return <Shield size={size} color={color} />;
  return <Sparkles size={size} color={color} />;
}

function ItemCard({ item, hero, round, onClick, selected, recommended, compact, currentBuild }) {
  const rating = getItemRating(item, hero);
  const score = getItemScore(item, hero, round || 1, currentBuild);
  return (
    <div
      onClick={onClick}
      style={{
        ...styles.glowCard(
          recommended ? "#e8a535" : selected ? "#4a90d9" : CAT_COLORS[item.cat]
        ),
        cursor: onClick ? "pointer" : "default",
        border: recommended
          ? "2px solid #e8a535"
          : selected
          ? "2px solid #4a90d9"
          : `1px solid ${CAT_COLORS[item.cat]}22`,
        padding: compact ? "8px 10px" : "12px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {item.legendary && (
        <div style={{
          position: "absolute", top: 0, right: 0,
          background: "linear-gradient(135deg, transparent 50%, rgba(232,165,53,0.3) 50%)",
          width: "32px", height: "32px",
        }}>
          <Crown size={10} color="#e8a535" style={{ position: "absolute", top: "4px", right: "4px" }} />
        </div>
      )}
      {recommended && (
        <div style={{
          position: "absolute", top: "4px", right: "4px",
          background: "#e8a535", borderRadius: "50%", width: "20px", height: "20px",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Check size={12} color="#0a0b0f" strokeWidth={3} />
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: compact ? "2px" : "6px" }}>
        <CatIcon cat={item.cat} size={compact ? 14 : 16} />
        <span style={{
          fontFamily: "'Rajdhani', sans-serif", fontWeight: 600,
          fontSize: compact ? "13px" : "15px", color: "#fff",
          flex: 1, lineHeight: 1.2,
        }}>
          {item.name}
        </span>
        <span style={styles.ratingBadge(rating)}>{rating}</span>
      </div>
      {!compact && (
        <div style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
          <span style={styles.catBadge(item.cat)}>{CAT_LABELS[item.cat]}</span>
          <span style={styles.tierBadge(item.tier)}>
            {item.tier === 5 ? "Legendary" : `T${TIER_NAMES[item.tier]}`}
          </span>
          {item.active && (
            <span style={{
              fontSize: "10px", fontWeight: 600, color: "#4a90d9",
              background: "rgba(74,144,217,0.12)", border: "1px solid rgba(74,144,217,0.3)",
              borderRadius: "3px", padding: "1px 5px", textTransform: "uppercase",
            }}>Active</span>
          )}
        </div>
      )}
      {!compact && item.desc && (
        <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#888", lineHeight: 1.3 }}>
          {item.desc}
        </p>
      )}
    </div>
  );
}

// ---- HERO SELECTOR ----
function HeroSelector({ selectedHero, onSelect }) {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(false);
  const filtered = HEROES.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    const order = { S: 0, A: 1, B: 2, C: 3, D: 4 };
    return (order[a.brawlTier] || 4) - (order[b.brawlTier] || 4);
  });

  return (
    <div style={{ ...styles.card, padding: "12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: expanded ? "10px" : "0" }}>
        <Target size={16} color="#e8a535" />
        <span style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", fontWeight: 600,
          color: "#e8a535", textTransform: "uppercase", letterSpacing: "1px",
        }}>Hero</span>
        {selectedHero && !expanded && (
          <span style={{
            fontFamily: "'Rajdhani', sans-serif", fontSize: "16px", fontWeight: 700,
            color: "#fff", flex: 1,
          }}>{selectedHero.name}</span>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{ ...styles.btn(expanded), fontSize: "11px", padding: "4px 10px" }}
        >
          {expanded ? "Close" : "Change"}
        </button>
      </div>
      {expanded && (
        <>
          <div style={{ position: "relative", marginBottom: "8px" }}>
            <Search size={14} color="#666" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            <input
              style={styles.input}
              placeholder="Search heroes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
            gap: "4px", maxHeight: "200px", overflowY: "auto",
            scrollbarWidth: "thin", scrollbarColor: "#333 transparent",
          }}>
            {filtered.map((h) => (
              <button
                key={h.id}
                onClick={() => { onSelect(h); setExpanded(false); setSearch(""); }}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  background: selectedHero?.id === h.id ? "rgba(232,165,53,0.15)" : "rgba(255,255,255,0.03)",
                  border: selectedHero?.id === h.id ? "1px solid rgba(232,165,53,0.4)" : "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "5px", padding: "6px 8px", cursor: "pointer",
                  transition: "all 0.1s",
                }}
              >
                <span style={styles.ratingBadge(h.brawlTier)}>{h.brawlTier}</span>
                <span style={{
                  fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", fontWeight: 600,
                  color: selectedHero?.id === h.id ? "#e8a535" : "#ccc",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>{h.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ---- ROUND TRACKER ----
function RoundTracker({ round, onSelect }) {
  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      <Flame size={14} color="#e8a535" />
      <span style={{
        fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", fontWeight: 600,
        color: "#e8a535", textTransform: "uppercase", letterSpacing: "1px", marginRight: "4px",
      }}>Round</span>
      {[1, 2, 3, 4, 5].map((r) => (
        <button
          key={r}
          onClick={() => onSelect(r)}
          style={{
            fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "15px",
            width: "34px", height: "34px", borderRadius: "6px", cursor: "pointer",
            color: round === r ? "#0a0b0f" : "#888",
            background: round === r
              ? "linear-gradient(135deg, #e8a535, #d4943a)"
              : "rgba(255,255,255,0.04)",
            border: round === r ? "none" : "1px solid rgba(255,255,255,0.08)",
            transition: "all 0.15s",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >{r}</button>
      ))}
    </div>
  );
}

// ---- TAB NAV ----
function TabNav({ tab, onSelect }) {
  const tabs = [
    { id: "tierlist", label: "Tier List", icon: Trophy },
    { id: "advisor", label: "Pick Advisor", icon: Target },
    { id: "buildpath", label: "Build Path", icon: Zap },
  ];
  return (
    <div style={{ display: "flex", gap: "4px", background: "rgba(0,0,0,0.3)", borderRadius: "8px", padding: "3px" }}>
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
            gap: "6px", padding: "8px 12px", borderRadius: "6px", cursor: "pointer",
            fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", fontWeight: 600,
            textTransform: "uppercase", letterSpacing: "0.5px",
            color: tab === id ? "#0a0b0f" : "#888",
            background: tab === id ? "linear-gradient(135deg, #e8a535, #d4943a)" : "transparent",
            border: "none", transition: "all 0.15s",
          }}
        >
          <Icon size={14} />
          {label}
        </button>
      ))}
    </div>
  );
}

// ---- TIER LIST VIEW ----
function TierListView({ hero, round }) {
  const [catFilter, setCatFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");

  const ratedItems = useMemo(() => {
    return ITEMS.map((item) => ({
      ...item,
      rating: getItemRating(item, hero),
      score: getItemScore(item, hero, round),
    }))
      .filter((i) => catFilter === "all" || i.cat === catFilter)
      .filter((i) => tierFilter === "all" || i.tier === Number(tierFilter))
      .sort((a, b) => {
        const rOrder = { S: 0, A: 1, B: 2, C: 3, D: 4 };
        if (rOrder[a.rating] !== rOrder[b.rating]) return rOrder[a.rating] - rOrder[b.rating];
        return b.score - a.score;
      });
  }, [hero, round, catFilter, tierFilter]);

  const grouped = useMemo(() => {
    const groups = { S: [], A: [], B: [], C: [], D: [] };
    ratedItems.forEach((i) => {
      if (groups[i.rating]) groups[i.rating].push(i);
    });
    return groups;
  }, [ratedItems]);

  return (
    <div>
      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "12px" }}>
        <button style={styles.btn(catFilter === "all")} onClick={() => setCatFilter("all")}>All</button>
        {["weapon", "vitality", "spirit"].map((c) => (
          <button key={c} style={{
            ...styles.btn(catFilter === c),
            color: catFilter === c ? "#0a0b0f" : CAT_COLORS[c],
            background: catFilter === c ? CAT_COLORS[c] : "rgba(255,255,255,0.05)",
            borderColor: catFilter === c ? CAT_COLORS[c] : "rgba(255,255,255,0.1)",
          }} onClick={() => setCatFilter(c)}>
            {CAT_LABELS[c]}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value)}
          style={{
            fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", fontWeight: 600,
            color: "#999", background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px",
            padding: "4px 8px", cursor: "pointer", textTransform: "uppercase",
          }}
        >
          <option value="all">All Tiers</option>
          <option value="1">Tier I (800)</option>
          <option value="2">Tier II (1600)</option>
          <option value="3">Tier III (3200)</option>
          <option value="4">Tier IV (6400)</option>
          <option value="5">Legendary</option>
        </select>
      </div>

      {!hero && (
        <div style={{
          ...styles.card, textAlign: "center", padding: "24px",
          border: "1px dashed rgba(232,165,53,0.3)",
        }}>
          <Info size={20} color="#e8a535" style={{ marginBottom: "8px" }} />
          <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "16px", fontWeight: 600, color: "#e8a535", margin: "0 0 4px" }}>
            Select a Hero
          </p>
          <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>
            Item ratings are personalized per hero. Pick your hero above for tailored recommendations.
          </p>
        </div>
      )}

      {Object.entries(grouped).map(([rating, items]) => {
        if (items.length === 0) return null;
        return (
          <div key={rating} style={{ marginBottom: "16px" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px",
              paddingBottom: "4px", borderBottom: `2px solid ${RATING_COLORS[rating]}33`,
            }}>
              <span style={{
                fontFamily: "'Rajdhani', sans-serif", fontSize: "22px", fontWeight: 700,
                color: RATING_COLORS[rating],
              }}>{rating}</span>
              <span style={{
                fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", fontWeight: 500,
                color: "#888", textTransform: "uppercase", letterSpacing: "1px",
              }}>
                {rating === "S" ? "Always Pick" :
                 rating === "A" ? "Strong Pick" :
                 rating === "B" ? "Solid Choice" :
                 rating === "C" ? "Situational" : "Avoid"}
              </span>
              <span style={{ fontSize: "12px", color: "#555", marginLeft: "auto" }}>
                {items.length} items
              </span>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "6px",
            }}>
              {items.map((item) => (
                <ItemCard key={item.id} item={item} hero={hero} round={round} compact={false} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---- PICK ADVISOR VIEW ----
function PickAdvisorView({ hero, round, currentBuild, onAddToBuild }) {
  const [groups, setGroups] = useState([[], [], []]);
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const addToGroup = (item) => {
    if (groups[activeGroup].length >= 3) return;
    if (groups.flat().some((i) => i.id === item.id)) return;
    const newGroups = groups.map((g, i) => i === activeGroup ? [...g, item] : g);
    setGroups(newGroups);
    setSearch("");
    // Auto advance to next unfilled group
    const nextEmpty = newGroups.findIndex((g) => g.length < 3);
    if (nextEmpty >= 0) setActiveGroup(nextEmpty);
  };

  const removeFromGroup = (groupIdx, itemIdx) => {
    const newGroups = groups.map((g, i) =>
      i === groupIdx ? g.filter((_, j) => j !== itemIdx) : g
    );
    setGroups(newGroups);
    setShowResults(false);
  };

  const clearAll = () => {
    setGroups([[], [], []]);
    setShowResults(false);
    setActiveGroup(0);
  };

  const allFilled = groups.every((g) => g.length === 3);

  const recommendations = useMemo(() => {
    if (!allFilled) return null;
    // Score each item, pick best from each group
    const scored = groups.map((group) =>
      group.map((item) => ({
        ...item,
        score: getItemScore(item, hero, round, currentBuild),
        rating: getItemRating(item, hero),
      })).sort((a, b) => b.score - a.score)
    );
    const picks = scored.map((g) => g[0]);
    const totalScore = picks.reduce((sum, p) => sum + p.score, 0);

    // Reroll recommendation - compare to expected average
    const avgExpected = hero ? 18 : 15;
    const shouldReroll = totalScore < avgExpected * 0.7;

    return { scored, picks, totalScore, shouldReroll };
  }, [groups, hero, round, currentBuild, allFilled]);

  const searchResults = useMemo(() => {
    if (!search) return [];
    return ITEMS.filter((i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) &&
      !groups.flat().some((g) => g.id === i.id)
    ).slice(0, 12);
  }, [search, groups]);

  return (
    <div>
      {!hero && (
        <div style={{
          ...styles.card, textAlign: "center", padding: "20px", marginBottom: "12px",
          border: "1px dashed rgba(232,165,53,0.3)",
        }}>
          <Info size={18} color="#e8a535" />
          <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", fontWeight: 600, color: "#e8a535", margin: "6px 0 2px" }}>
            Select a hero for personalized recommendations
          </p>
          <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>General ratings will be used otherwise</p>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <p style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", fontWeight: 500,
          color: "#888", margin: 0, flex: 1,
        }}>
          Add the 9 items you were offered (3 per group) to get a recommendation
        </p>
        <button onClick={clearAll} style={{ ...styles.btn(false), fontSize: "11px", padding: "4px 10px", display: "flex", gap: "4px", alignItems: "center" }}>
          <RotateCcw size={11} /> Clear
        </button>
      </div>

      {/* Item Search */}
      <div style={{ position: "relative", marginBottom: "12px" }}>
        <Search size={14} color="#666" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
        <input
          style={styles.input}
          placeholder="Search items to add..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {searchResults.length > 0 && (
          <div style={{
            position: "absolute", top: "100%", left: 0, right: 0, zIndex: 20,
            background: "#1a1c24", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "0 0 8px 8px", maxHeight: "240px", overflowY: "auto",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          }}>
            {searchResults.map((item) => (
              <div
                key={item.id}
                onClick={() => addToGroup(item)}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "8px 12px", cursor: "pointer",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  transition: "background 0.1s",
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "rgba(232,165,53,0.08)"}
                onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
              >
                <CatIcon cat={item.cat} size={14} />
                <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "14px", color: "#fff", flex: 1 }}>
                  {item.name}
                </span>
                <span style={styles.catBadge(item.cat)}>{CAT_LABELS[item.cat]}</span>
                <span style={styles.tierBadge(item.tier)}>
                  {item.tier === 5 ? "L" : `T${item.tier}`}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Three Groups */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "12px" }}>
        {groups.map((group, gi) => (
          <div
            key={gi}
            onClick={() => setActiveGroup(gi)}
            style={{
              ...styles.card,
              border: activeGroup === gi
                ? "2px solid rgba(232,165,53,0.5)"
                : "1px solid rgba(255,255,255,0.06)",
              padding: "10px",
              cursor: "pointer",
              minHeight: "140px",
            }}
          >
            <div style={{
              fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", fontWeight: 700,
              color: activeGroup === gi ? "#e8a535" : "#666",
              textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px",
            }}>
              Group {gi + 1} ({group.length}/3)
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {group.map((item, ii) => (
                <div key={item.id} style={{
                  display: "flex", alignItems: "center", gap: "4px",
                  background: (showResults && recommendations?.picks.some((p) => p.id === item.id))
                    ? "rgba(232,165,53,0.12)" : "rgba(255,255,255,0.03)",
                  border: (showResults && recommendations?.picks.some((p) => p.id === item.id))
                    ? "1px solid rgba(232,165,53,0.4)" : "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "4px", padding: "4px 6px",
                }}>
                  <CatIcon cat={item.cat} size={12} />
                  <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", fontWeight: 600, color: "#ddd", flex: 1 }}>
                    {item.name}
                  </span>
                  {showResults && recommendations?.picks.some((p) => p.id === item.id) && (
                    <Check size={12} color="#e8a535" />
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); removeFromGroup(gi, ii); }}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      color: "#555", padding: "0 2px", display: "flex",
                    }}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              {group.length < 3 && (
                <div style={{
                  border: "1px dashed rgba(255,255,255,0.1)", borderRadius: "4px",
                  padding: "4px 6px", textAlign: "center",
                  fontSize: "11px", color: "#444",
                }}>
                  {activeGroup === gi ? "Search above to add" : "Click to select"}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Analyze Button */}
      {allFilled && (
        <button
          onClick={() => setShowResults(true)}
          style={{
            ...styles.btn(true), width: "100%", padding: "12px",
            fontSize: "16px", letterSpacing: "2px", marginBottom: "12px",
            background: "linear-gradient(135deg, #e8a535, #d4943a)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          }}
        >
          <Target size={18} /> Analyze Picks
        </button>
      )}

      {/* Results */}
      {showResults && recommendations && (
        <div style={{
          ...styles.card,
          border: "1px solid rgba(232,165,53,0.3)",
          background: "linear-gradient(180deg, rgba(232,165,53,0.06) 0%, rgba(19,21,27,0.95) 100%)",
        }}>
          <div style={{
            fontFamily: "'Rajdhani', sans-serif", fontSize: "18px", fontWeight: 700,
            color: "#e8a535", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px",
          }}>
            Recommended Picks
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "12px" }}>
            {recommendations.picks.map((item) => (
              <ItemCard key={item.id} item={item} hero={hero} round={round} recommended compact currentBuild={currentBuild} />
            ))}
          </div>
          {recommendations.shouldReroll && (
            <div style={{
              background: "rgba(255,71,87,0.1)", border: "1px solid rgba(255,71,87,0.3)",
              borderRadius: "6px", padding: "10px 12px", marginBottom: "12px",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              <RotateCcw size={16} color="#ff4757" />
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", fontWeight: 600, color: "#ff4757" }}>
                Consider using your reroll - these options are below average for {hero?.name || "your hero"}
              </span>
            </div>
          )}
          <button
            onClick={() => {
              recommendations.picks.forEach((item) => onAddToBuild(item));
              clearAll();
            }}
            style={{ ...styles.btn(false), width: "100%", padding: "10px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
          >
            <ArrowRight size={14} /> Lock in picks and advance round
          </button>
        </div>
      )}
    </div>
  );
}

// ---- BUILD PATH VIEW ----
function BuildPathView({ hero, round, currentBuild, onRemoveFromBuild, onClearBuild }) {
  const catCounts = useMemo(() => {
    const counts = { weapon: 0, vitality: 0, spirit: 0 };
    currentBuild.forEach((item) => { counts[item.cat]++; });
    return counts;
  }, [currentBuild]);

  const totalItems = currentBuild.length;
  const maxPerRound = 3;

  // Ideal distribution advice based on hero
  const getAdvice = () => {
    if (!hero) return "Select a hero for personalized build path guidance.";
    const isGun = hero.playstyle.includes("gun") || hero.playstyle.includes("sniper");
    const isSpirit = hero.playstyle.includes("spirit") || hero.playstyle.includes("burst") || hero.playstyle.includes("aoe");
    const isTank = hero.playstyle.includes("tank");
    const isSupport = hero.playstyle.includes("support");
    const isMelee = hero.playstyle.includes("melee") || hero.playstyle.includes("assassin");

    if (isGun) return `${hero.name} benefits from heavy Weapon investment. Aim for 7+ Weapon items across rounds, with 4-5 Vitality for survivability and 2-3 Spirit for utility.`;
    if (isSpirit) return `${hero.name} scales hard with Spirit items. Prioritize 7+ Spirit items for ability power, 4-5 Vitality for sustain, and 2-3 Weapon for base damage.`;
    if (isTank) return `${hero.name} thrives with Vitality. Target 7+ Vitality items for tankiness, with even split of Weapon and Spirit (3-4 each) for damage.`;
    if (isSupport) return `${hero.name} excels with mixed Spirit and Vitality. Aim for 5-6 Spirit, 5-6 Vitality, and 2-3 Weapon items.`;
    if (isMelee) return `${hero.name} needs both damage and durability. Balance 5-6 Weapon items (especially melee/close-range), 5-6 Vitality, and 2-3 Spirit.`;
    return `${hero.name} benefits from a balanced build. Adjust based on what the mode offers you each round.`;
  };

  return (
    <div>
      <div style={{
        ...styles.card, marginBottom: "12px",
        border: "1px solid rgba(232,165,53,0.15)",
        background: "linear-gradient(180deg, rgba(232,165,53,0.04) 0%, rgba(19,21,27,0.9) 100%)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <Zap size={16} color="#e8a535" />
          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "16px", fontWeight: 700, color: "#e8a535" }}>
            Build Strategy
          </span>
        </div>
        <p style={{ fontSize: "13px", color: "#aaa", margin: 0, lineHeight: 1.5 }}>
          {getAdvice()}
        </p>
      </div>

      {/* Category Distribution Bar */}
      <div style={{ ...styles.card, marginBottom: "12px" }}>
        <div style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", fontWeight: 600,
          color: "#888", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px",
        }}>
          Item Distribution ({totalItems}/{maxPerRound * 5} slots)
        </div>
        <div style={{ display: "flex", gap: "2px", height: "28px", borderRadius: "6px", overflow: "hidden", marginBottom: "8px" }}>
          {totalItems === 0 ? (
            <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "11px", color: "#555" }}>No items yet</span>
            </div>
          ) : (
            Object.entries(catCounts).map(([cat, count]) => (
              count > 0 && (
                <div key={cat} style={{
                  flex: count, background: `${CAT_COLORS[cat]}44`,
                  borderLeft: `3px solid ${CAT_COLORS[cat]}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.3s",
                }}>
                  <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", fontWeight: 700, color: CAT_COLORS[cat] }}>
                    {count}
                  </span>
                </div>
              )
            ))
          )}
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          {Object.entries(catCounts).map(([cat, count]) => (
            <div key={cat} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: CAT_COLORS[cat] }} />
              <span style={{ fontSize: "12px", color: "#888" }}>{CAT_LABELS[cat]}: {count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Round-by-round Build */}
      <div style={{ ...styles.card }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px",
        }}>
          <span style={{
            fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", fontWeight: 600,
            color: "#e8a535", textTransform: "uppercase", letterSpacing: "1px",
          }}>Your Build</span>
          {currentBuild.length > 0 && (
            <button onClick={onClearBuild} style={{ ...styles.btn(false), fontSize: "10px", padding: "3px 8px" }}>
              Clear Build
            </button>
          )}
        </div>

        {[1, 2, 3, 4, 5].map((r) => {
          const roundItems = currentBuild.slice((r - 1) * 3, r * 3);
          const isCurrentRound = r === round;
          return (
            <div key={r} style={{
              marginBottom: "8px", padding: "8px",
              background: isCurrentRound ? "rgba(232,165,53,0.06)" : "transparent",
              borderRadius: "6px",
              border: isCurrentRound ? "1px solid rgba(232,165,53,0.15)" : "1px solid transparent",
            }}>
              <div style={{
                fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", fontWeight: 700,
                color: isCurrentRound ? "#e8a535" : "#555",
                textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px",
              }}>
                Round {r} {isCurrentRound && " (current)"}
                <span style={{ color: "#444", fontWeight: 500, marginLeft: "6px" }}>
                  - Expect T{r <= 2 ? "I-II" : r <= 3 ? "II-III" : "III-IV"} items
                  {r >= 4 ? " + legendaries" : ""}
                </span>
              </div>
              <div style={{ display: "flex", gap: "4px" }}>
                {roundItems.length > 0 ? roundItems.map((item, idx) => (
                  <div key={item.id} style={{
                    flex: 1, display: "flex", alignItems: "center", gap: "4px",
                    background: `${CAT_COLORS[item.cat]}11`,
                    border: `1px solid ${CAT_COLORS[item.cat]}33`,
                    borderRadius: "4px", padding: "4px 6px",
                  }}>
                    <CatIcon cat={item.cat} size={12} />
                    <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", fontWeight: 600, color: "#ddd", flex: 1 }}>
                      {item.name}
                    </span>
                    <button
                      onClick={() => onRemoveFromBuild((r - 1) * 3 + idx)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#555", padding: 0, display: "flex" }}
                    >
                      <X size={10} />
                    </button>
                  </div>
                )) : (
                  [0, 1, 2].map((i) => (
                    <div key={i} style={{
                      flex: 1, border: "1px dashed rgba(255,255,255,0.06)",
                      borderRadius: "4px", padding: "4px 6px", textAlign: "center",
                    }}>
                      <span style={{ fontSize: "10px", color: "#333" }}>Empty</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function DeadlockBrawlPicker() {
  const [selectedHero, setSelectedHero] = useState(null);
  const [currentRound, setCurrentRound] = useState(1);
  const [activeTab, setActiveTab] = useState("tierlist");
  const [currentBuild, setCurrentBuild] = useState([]);

  const addToBuild = useCallback((item) => {
    setCurrentBuild((prev) => {
      if (prev.length >= 15) return prev;
      return [...prev, item];
    });
  }, []);

  const removeFromBuild = useCallback((idx) => {
    setCurrentBuild((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const clearBuild = useCallback(() => setCurrentBuild([]), []);

  // Load Google Font
  useEffect(() => {
    const link = document.createElement("link");
    link.href = FONT_URL;
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <div style={styles.app}>
      {/* Atmospheric background effect */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 20% 0%, rgba(232,165,53,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(183,127,212,0.03) 0%, transparent 50%)",
        zIndex: 0,
      }} />

      {/* Header */}
      <div style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <h1 style={styles.title}>Deadlock Brawl Picker</h1>
            <p style={styles.subtitle}>Street Brawl Item Priority Companion</p>
          </div>
          <RoundTracker round={currentRound} onSelect={setCurrentRound} />
        </div>
      </div>

      {/* Main Content */}
      <div style={{ position: "relative", zIndex: 1, padding: "12px 16px 24px", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ marginBottom: "12px" }}>
          <HeroSelector selectedHero={selectedHero} onSelect={setSelectedHero} />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <TabNav tab={activeTab} onSelect={setActiveTab} />
        </div>

        {activeTab === "tierlist" && (
          <TierListView hero={selectedHero} round={currentRound} />
        )}
        {activeTab === "advisor" && (
          <PickAdvisorView
            hero={selectedHero}
            round={currentRound}
            currentBuild={currentBuild}
            onAddToBuild={addToBuild}
          />
        )}
        {activeTab === "buildpath" && (
          <BuildPathView
            hero={selectedHero}
            round={currentRound}
            currentBuild={currentBuild}
            onRemoveFromBuild={removeFromBuild}
            onClearBuild={clearBuild}
          />
        )}
      </div>
    </div>
  );
}
