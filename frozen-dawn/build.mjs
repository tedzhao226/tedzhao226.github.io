import fs from "node:fs/promises"
import path from "node:path"
import { localize } from "./localize.mjs"
const root = path.dirname(new URL(import.meta.url).pathname)
const video = "https://www.youtube.com/watch?v=45dG6srGVMA"
const stamp = (t) => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`
const esc = (s) => s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;")
const shotSet = new Set()
const watch = (t, label = "Watch this moment") =>
  `<a class="time" href="${video}&t=${t}s" target="_blank" rel="noreferrer">${label} · ${stamp(t)} ↗</a>`
const note = (s, kind = "note") => `<p class="${kind}">${s}</p>`
const list = (a) => `<ol class="steps">${a.map((s) => `<li>${s}</li>`).join("")}</ol>`
function gallery(items, cls = "") {
  return `<div class="gallery ${cls}">${items
    .map(([t, title, detail = ""]) => {
      shotSet.add(t)
      return `<figure><button class="image-open" data-image data-caption="${esc(title)}" data-time="${t}" aria-label="Enlarge: ${esc(title)}"><img src="assets/${t}.jpg" alt="${esc(title)}${detail ? " — " + esc(detail) : ""}" width="1920" height="1080" loading="lazy"><span class="zoom">Enlarge</span></button><figcaption><strong>${title}</strong>${detail ? `<span>${detail}</span>` : ""}${watch(t, "Video frame")}</figcaption></figure>`
    })
    .join("")}</div>`
}
const table = (heads, rows) =>
  `<div class="table-wrap"><table><thead><tr>${heads.map((x) => `<th scope="col">${x}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((x, i) => (i === 0 ? `<th scope="row">${x}</th>` : `<td>${x}</td>`)).join("")}</tr>`).join("")}</tbody></table></div>`
const stages = []
function stage(id, title, range, kicker, body, done) {
  stages.push({ id, title, range, kicker, body, done })
}

stage(
  "opening",
  "Open Thule & collect the first pieces",
  [6, 100],
  "Crash Site → Ice Caves → Morgue",
  note(
    "Use the video’s early-round route: begin several weapon quests together and keep moving the battery forward.",
  ) +
    table(
      ["Loadout", "Creator’s recommendation"],
      [
        ["Starting weapon", "9mm SAP"],
        ["Specialist", "Frontline"],
        ["Mods", "Determination · Hand to Hand · Vicious"],
        ["Equipment", "Sticky grenades"],
      ],
    ) +
    list([
      "On <strong>round 1</strong>, collect the <strong>wires</strong> and <strong>battery</strong> at Crash Site. Carry the battery to the Thule entrance. Save your starting points; the creator delays Quick Revive.",
      "Stand on the <strong>circular floor plate</strong> and melee the five zombies while on it. The entrance opens. Move down, buy the next door and kill the central special enemy.",
      "Stand in the first blood pool on the left and make <strong>five kills</strong>. In this route, four are available now; finish it with the first zombie of round 2.",
      "During the round change, move the battery to the <strong>Morgue door on the right</strong>. Pick up <strong>stone 1</strong> by the Overlook ledge.",
      "Earn <strong>1,250 points</strong>, open the Morgue, and get <strong>five kills in its blood pool</strong>. Take <strong>stone 2</strong> to the right of its armor station.",
      "Move the battery toward the Phylactery door. At the bottom of the Morgue stairs, pick up the <strong>round plate with the raven emblem (Bloodraven stone)</strong> among the skeletons and body jars. Keep it for the Overlook blood pool; it is separate from the four puzzle stones.",
      "On round 3, earn points and <strong>leave one zombie alive</strong>. Enter the Phylactery and move the battery toward the Overlook door. Buy Quick Revive when you can afford it before the lockdown.",
    ]) +
    gallery([
      [26, "Wires at Crash Site", "Search the ground beside the wreckage."],
      [30, "Battery beneath the wreckage"],
      [34, "The opening floor plate"],
      [51, "First blood-pool area", "Ice Caves, left after entering."],
      [60, "Stone 1: Overlook ledge"],
      [71, "Second blood pool: Morgue"],
      [79, "Stone 2: beside Morgue armor"],
      [89, "Bloodraven stone", "Keep it for the Overlook blood pool."],
    ]) +
    '<div id="pool-setup"><h3>Keep for later: round plate &amp; raven</h3>' +
    note(
      "The video fills the pools in this order: <strong>Ice Caves → Morgue → Overlook</strong>. The round plate repairs the Overlook pool; the Morgue pool already has its plate.",
    ) +
    list([
      '<strong>Place the plate before getting kills:</strong> interact with the center of the Overlook pool to install the Bloodraven stone, then stand in the pool and get five kills. Follow the <a href="#hammer-grid">hammer step</a> for when to do this in the video’s route.',
      '<strong>Activate the raven for the shield upgrade:</strong> interact with the raven perched among the rocks beside the Overlook pool until it flies away. This starts the raven hunt used to spawn charged Corpse Eaters; continue at the <a href="#hammer-trial">shield-upgrade setup</a>.',
    ]) +
    gallery([
      [
        87,
        "Round plate: Bloodraven stone",
        "At the bottom of the Morgue stairs, among skeletons and body jars.",
      ],
      [
        770,
        "Raven statue at the third pool",
        "Overlook: interact with the raven among the rocks beside the pool.",
      ],
    ]) +
    "</div>",
  "Two pools filled; wires, Bloodraven stone and two puzzle stones collected. Battery moved toward Overlook.",
)

stage(
  "scythe-stones",
  "Claim the scythe & finish the stone set",
  [100, 162],
  "Phylactery → Overlook → Archives → Blood Altar",
  list([
    "Interact with the <strong>forge symbol in the Phylactery</strong> to begin the scythe lockdown. Survive for about <strong>30 seconds</strong>. Avoid unnecessary kills: this lockdown can advance rounds quickly. Pick up the scythe afterward.",
    "Open the Overlook and put the battery in its <strong>cauldron</strong>. Get about <strong>15 nearby kills</strong> until the battery glows purple by itself.",
    "Open the <strong>Thulian Archives</strong>. Take <strong>stone 3</strong> from the ground to the right of Speed Cola.",
    "Open the <strong>Blood Altar</strong>. Take <strong>stone 4</strong> from the ledge. While here, check the possible <strong>gear</strong> on the ledge right of the Mystery Box and the <strong>book</strong> near the blood pool.",
  ]) +
    gallery([
      [104, "Scythe forge / lockdown switch"],
      [127, "Battery cauldron at Overlook"],
      [139, "Stone 3: right of Speed Cola"],
      [146, "Stone 4: Blood Altar ledge"],
      [154, "Blood Altar gear and book area"],
    ]),
  "Base scythe acquired; battery charged; all four puzzle stones collected.",
)

stage(
  "pillars",
  "Solve the stones & bring the hammer home",
  [162, 298],
  "Overlook · Rune order + four rotating pillars",
  list([
    "Insert the four stones into the <strong>Overlook wall slots</strong>. Read the symbols under them <strong>left to right</strong>. This is <em>your game’s</em> code.",
    "Find the matching symbols on the rocks around the middle. Kill one zombie beside each symbol in the wall’s order. <strong>Check that lightning enters the correct symbol</strong> after every kill. The creator’s M → F → S → R is only an example.",
    "When lightning flashes in the center, solve each of the four pillars using the table below. All four blocks on each pillar must face inward.",
    "Find the floating hammer around the main loop. <strong>Go prone before approaching it</strong>, crawl underneath and interact. Approaching upright sends it elsewhere.",
    "Guide it back to the Overlook center. It moves <strong>away from you</strong>, so stand on the opposite side from the direction you want it to travel. Pick it up when it reaches the center.",
  ]) +
    gallery([
      [164, "Four stone slots", "Read the wall symbols from left to right."],
      [186, "Kill beside the matching rock rune"],
      [267, "Floating hammer", "Approach prone; then guide it away from you."],
    ]) +
    `<h3>Pillar reference</h3><p>Name the blocks <strong>A, B, C, D from top to bottom</strong>. First align the top three: shoot <strong>B until A faces inward</strong>, then <strong>C until B faces inward</strong>, then <strong>D until C faces inward</strong>. Now inspect the bottom block D.</p>` +
    table(
      ["D’s remaining direction", "Shoot A", "Shoot B", "Shoot C", "Shoot D"],
      [
        ["Right", "1", "2", "3", "0"],
        ["Away from center", "2", "0", "2", "0"],
        ["Left", "3", "2", "1", "0"],
        ["Already inward", "0", "0", "0", "0"],
      ],
    ) +
    note(
      "Use the direction shown from the pillar’s inward-facing side. Fire individual shots. A finished pillar glows purple; repeat for all four.",
    ) +
    gallery([
      [234, "Creator’s pillar chart", "Original on-screen alignment instructions."],
      [243, "Right-facing D solution"],
      [251, "Left-facing D solution"],
    ]),
  "Four pillars glow purple; base hammer acquired at Overlook.",
)

stage(
  "cipher",
  "Collect the books & gears; unlock the flail",
  [298, 415],
  "Archives · Cipher Room · Gearworks · Orrery",
  list([
    "Find <strong>two books</strong> among the four possible spots below. Insert them into the pedestal in the <strong>upper Archives</strong> to open the Cipher Room.",
    "Find <strong>three gears</strong>. Check the Cipher Room after opening it. The narration says “six” but then lists the <strong>seven candidates</strong> shown below.",
    "Install the three gears in the <strong>Gearworks</strong>. Kill zombies nearby, either downstairs by the gears or upstairs in the main Archives, until the Orrery activates.",
    'Read the <strong>colored orb positions on the cipher wall</strong>. Match each orb’s position on the Orrery using the <a href="#orrery-chart">orientation chart</a> below, and read its <strong>viewpoint warning</strong> first.',
    "Interact with the matching <strong>colored control orb at the lower right</strong> as the moving orb approaches its target. There are <strong>eight positions</strong>: four cardinal directions and four diagonals. A wrong solution resets after a short delay.",
    "When all orbs match, take the <strong>Broken Flail</strong>.",
  ]) +
    `<h3>Book locations · collect 2</h3>` +
    gallery([
      [301, "Morgue", "Before the drop-off."],
      [306, "Blood Altar", "Near the blood pool."],
      [310, "Overlook", "Behind the rocks."],
      [312, "Passage", "Right of the Pack-a-Punch transport."],
    ]) +
    `<h3>Gear locations · collect 3</h3>` +
    gallery([
      [325, "Crash Site", "Right of the broken plane."],
      [330, "Ice Caves", "Left of the boss-fight transport."],
      [336, "Blood Altar", "Ledge to the right of the Mystery Box."],
      [341, "Phylactery", "Left of the Grease Gun wall buy."],
      [345, "Overlook", "Near the stairs."],
      [348, "Cipher Room", "Open it with the two books first."],
      [351, "Passage", "Small nook past the Pack-a-Punch transport."],
    ]) +
    `<h3 id="orrery-chart">Cipher → Orrery orientation</h3><p><strong>Do not copy this screenshot’s colored code.</strong> Copy the positions from your own cipher wall. The chart supplies the landmarks needed to translate its flat view to the physical machine.</p>` +
    note(
      "<strong>Viewpoint warning: the cipher wall shows the Orrery from below.</strong> To picture the machine from above, hold the <strong>big arm / Speed Cola at the top</strong> and the <strong>small arm at the bottom</strong>, then <strong>mirror left and right</strong> (east and west). Top and bottom (north and south) stay where they are; a 180-degree “upside down” turn is wrong. Position examples only, not colored solutions: a wall target at <strong>9 o’clock</strong> becomes <strong>3 o’clock</strong> in that top-down view, and <strong>7:30</strong> becomes <strong>4:30</strong>. The chart below already places the room landmarks on the wall as you see it: <strong>follow them directly and do not mirror them a second time</strong>.",
    ) +
    gallery(
      [
        [
          380,
          "Original cipher orientation chart",
          "Top = big arm / Speed Cola; bottom = small arm.",
        ],
        [390, "Orrery and colored controls", "Stop each color as it reaches its own target."],
      ],
      "wide",
    ) +
    table(
      ["On the chart", "Map landmark"],
      [
        ["Top", "Big arm / Speed Cola"],
        ["Upper right", "Stairs toward the Cipher Room"],
        ["Lower right", "Hallway toward Overlook"],
        ["Bottom", "Small arm"],
        ["Lower left", "Stairs toward Gearworks"],
      ],
    ),
  "Broken Flail acquired; keep access to the scythe for the next step.",
)

stage(
  "constellations",
  "Raise Pack-a-Punch & trace three constellations",
  [415, 555],
  "Interleave three transport rides with the flail plates",
  list([
    "Equip the <strong>scythe</strong> and go to the Passage. Interact with the wall block until it turns <strong>red</strong>, then take the transport into Lost in Blood. Preserve the normal zombies in that room.",
    "After being returned, two Corpse Eaters appear. <strong>Swing the scythe while holding Interact</strong> to take a spine. The creator describes one chance per enemy. Place the scythe at its <strong>Phylactery upgrade spot</strong>; the wires collected at spawn are part of this setup.",
    "Take the flail. Aim into the room <strong>above the Archives Orrery</strong>, press the grenade/equipment button to throw its orb, then press again to teleport. Stand on the <strong>left plate</strong> and get <strong>three flail melee kills</strong>. A rune floats above it.",
    "With the flail equipped, search the six viewpoints below while <strong>holding ADS / aim</strong>. When stars appear, keep aiming and move the crosshair over <strong>every star</strong> until the pattern lights up and completion is confirmed.",
    "Take the <strong>Blood Altar transport</strong> for the second Pack-a-Punch visit. Preserve the room’s normal zombies; kill the Corpse Eaters after returning. Go back above the Orrery, get <strong>three flail kills on the middle plate</strong>, then find and trace the next constellation.",
    "Take the <strong>Crash Site transport</strong> for the third visit. Again preserve normal zombies in Lost in Blood and kill the returning Corpse Eaters. Get <strong>three flail kills on the right plate</strong>, then trace the final constellation.",
  ]) +
    table(
      ["Cycle", "Transport", "Plate", "Finish"],
      [
        [
          "1",
          "Passage, after making the block red",
          "Left",
          "3 flail kills → trace one constellation",
        ],
        ["2", "Blood Altar", "Middle", "3 flail kills → trace one constellation"],
        ["3", "Crash Site", "Right", "3 flail kills → trace one constellation"],
      ],
    ) +
    gallery([
      [420, "Pack-a-Punch activation block", "Turn it red before the first transport ride."],
      [443, "Spine pickup from a Corpse Eater"],
      [456, "Teleport above the Orrery"],
      [467, "Upper-room plate"],
    ]) +
    `<h3>Six constellation viewpoints</h3>` +
    note(
      "These are the video’s search viewpoints, not six fixed answers. Only an activated constellation is visible through the flail’s aim view. Complete one plate and one constellation before starting the next. The creator does not give a reliable rune-to-location mapping.",
    ) +
    gallery([
      [492, "1 · Above the Archives Orrery", "Look up over the machine."],
      [498, "2 · Overlook", "Look beyond the blood pool."],
      [502, "3 · Phylactery window", "Look near Electric Cherry."],
      [505, "4 · Blood Altar, far left"],
      [510, "5 · Blood Altar, right side", "Look left of the transport."],
      [515, "6 · Crash Site", "Look above the entrance to Thule."],
    ]) +
    gallery(
      [
        [
          481,
          "A completed constellation",
          "The stars turn gold after tracing. Your pattern may differ.",
        ],
        [536, "Another active star pattern", "Hold aim and sweep across every star."],
      ],
      "wide",
    ),
  "All three constellations complete; Orrery glows; Pack-a-Punch raised through three transport visits.",
)

stage(
  "flail-trial",
  "Pass the Moonraven / flail trial",
  [555, 591],
  "Archives Orrery → Trial → Ice Caves",
  list([
    "At the glowing Orrery, throw the flail orb into the statue and <strong>teleport as the orb reaches it</strong>.",
    "Survive the trial’s fire walls by teleporting through them. As a wall approaches, aim the orb at the <strong>far side of the platform beyond the approaching wall</strong>. Throw just before the fire reaches the platform; teleport when the wall is near the platform’s middle.",
    "Complete this dodge <strong>twice</strong>, dealing with the zombies between attacks. The fire is lethal if the timing fails.",
    "Take the upgraded flail and place it in its <strong>Ice Caves pedestal</strong>.",
  ]) +
    gallery(
      [
        [558, "Glowing Orrery: trial entrance"],
        [
          575,
          "Fire-wall timing",
          "Throw across the incoming wall, then teleport after it passes your landing point.",
        ],
      ],
      "wide",
    ),
  "Moonraven trial complete; upgraded flail deposited in the Ice Caves.",
)

stage(
  "hammer-grid",
  "Carry the lightning & solve the hammer wall",
  [591, 732],
  "Crash Site → Tunnel → Morgue → Phylactery → Blood Altar hall",
  list([
    "Take the hammer and buy <strong>Stamin-Up at Overlook</strong>. Melee the lightning rune at <strong>Crash Site</strong> to pick up its charge.",
    "Sprint to the next rune on the <strong>left side of the tunnel</strong> and melee it to deposit the charge. Melee again to pick it up and run to the rune on the <strong>Morgue wall beside the blood pool</strong>. Each deposited rune is a checkpoint; a timeout returns the charge to the last one.",
    "For the high Phylactery rune, first gather slower zombies on the left side of that room. Retrieve the charge, stand in the marked circle and <strong>melee a zombie beside it with clear line of sight to the high rune</strong>. A zombie underneath the door frame will not work. Lightning must jump to the rune.",
    "<strong>Creator’s shortcut:</strong> quickly put the hammer away and draw it again. If its lightning returns, melee the puzzle-wall rune in the hall toward Blood Altar.",
    "<strong>If the shortcut fails:</strong> place the Bloodraven stone in the Overlook’s third pool and get <strong>five kills</strong>. A shield-bearing Wüstling appears in the Blood Altar pool. Lead it beneath the Phylactery lightning, let it become charged, then kill it with the hammer. Pick up the charge from that kill and melee the puzzle-wall rune. It also drops the base shield.",
    "Solve the three wall patterns using the numbered charts below. <strong>Wait for every block to stop spinning before firing the next shot.</strong> If you make a mistake, shoot the <strong>skull block</strong> to reset.",
  ]) +
    gallery([
      [603, "Starting lightning rune"],
      [610, "Tunnel checkpoint", "Left wall along the route."],
      [621, "Morgue checkpoint", "Beside the blood pool."],
      [646, "Phylactery transfer area", "The zombie needs line of sight to the high rune."],
      [651, "High rune receives lightning"],
      [669, "Wall-puzzle activation rune"],
    ]) +
    `<h3>Hammer wall · numbered shot order</h3><p>Face the wall directly. Number rows from <strong>top to bottom</strong> and columns from <strong>left to right</strong>. Each pair below is <strong>(row, column)</strong>. Match Wall 1 to the original screenshot before choosing a variant.</p>` +
    table(
      ["Pattern", "Shoot these cells in order"],
      [
        ["Wall 1 · variant 1", "(1,2) → (2,1) → (3,1) → (3,2) → (3,3)"],
        ["Wall 1 · variant 2", "(1,2) → (2,2)"],
        ["Wall 2", "(1,2) → (3,3) → (3,4) → (3,5)"],
        ["Wall 3", "(1,2) → (1,3) → (2,1) → (2,2) → (2,4) → (2,5) → (2,6) → (3,1) → (3,6)"],
      ],
    ) +
    gallery(
      [
        [
          709,
          "Wall 1: both starting variants",
          "Numbers printed on the blocks show the shot order.",
        ],
        [721, "Walls 2 and 3", "These two solutions are fixed in the video."],
      ],
      "wide",
    ) +
    note(
      "If the shortcut worked, you still need to fill the third pool and obtain the shield later. The shortcut only changes how you recover the hammer’s lightning.",
    ),
  "Three hammer wall patterns solved. Base shield may already be available if you used the Wüstling route.",
)

stage(
  "hammer-trial",
  "Pass the hammer trial & begin the shield upgrade",
  [732, 805],
  "Overlook → Stormraven trial → Blood pools",
  list([
    "At Overlook, line up with the <strong>armor station</strong> and the <strong>center line of the volcano</strong>, as shown below. Hold the hammer out and walk straight forward. <strong>Do not steer left or right</strong> on the invisible path; continue until the trial transports you.",
    "In the trial, <strong>hold the grenade/equipment button to throw the hammer</strong>. This breaks the zombies’ shields. Finish the enemies and deposit the upgraded hammer in the Ice Caves.",
    "If still unfinished, interact with the center of the Overlook pool to place the <strong>round plate (Bloodraven stone)</strong>, then stand in it and get <strong>five kills</strong>. Kill the shield-bearing Wüstling that emerges at Blood Altar and take its shield.",
    "Interact with the <strong>raven statue among the rocks beside the Overlook pool</strong> until it flies away. This starts the raven hunt for charged Corpse Eaters. Then inspect the three blood pools: the target has <strong>red sparks / sizzling energy</strong>. A still pool is not the current target.",
    "Listen for a raven, check the location atlas below, and shoot it with the <strong>9mm SAP</strong>, following the creator’s method. This spawns a charged Corpse Eater. Keep it close and bring it to the active pool.",
  ]) +
    gallery([
      [736, "Invisible-path alignment", "Armor station → volcano center; walk straight."],
      [750, "Hammer trial", "Throw the hammer to break shields."],
      [770, "Raven statue at the third pool"],
      [
        787,
        "Find the energized blood pool",
        "Look for moving red sparks; still blood is not enough.",
      ],
    ]),
  "Upgraded hammer deposited; shield acquired; raven statue activated; current energized pool identified.",
)

const ravenGroups = [
  [
    "Crash Site",
    805,
    [
      [807, "Plane tail"],
      [809, "Top of the transport"],
      [810, "Central rock pillar"],
      [812, "Metal beams of the wreck"],
      [815, "Rocks over the Thule entrance"],
    ],
  ],
  [
    "Ice Caves",
    817,
    [
      [818, "Rocks on the right after the ramp"],
      [820, "Wonder-weapon pedestal ledge"],
      [824, "Left side of the angled columns"],
    ],
  ],
  [
    "Thulian Archives",
    828,
    [
      [832, "High above Speed Cola"],
      [835, "Corner to the right, same height"],
      [837, "Upper flail-teleport ledge"],
      [841, "Small hole high to the right"],
      [845, "Ground in the hall toward Overlook"],
    ],
  ],
  [
    "Overlook",
    847,
    [
      [848, "Stone pillars past the blood pool"],
      [851, "Tall central pillar"],
      [854, "Rocks above Stamin-Up"],
    ],
  ],
  [
    "Phylactery",
    856,
    [
      [857, "High window left of Electric Cherry"],
      [860, "Ledge left of Electric Cherry"],
      [863, "Rocks opposite Electric Cherry"],
      [867, "Far side of the blood tub"],
      [870, "Far upper ledge, right view"],
      [873, "Same upper ledge, center"],
      [876, "Same upper ledge, far left / behind"],
    ],
  ],
  [
    "Blood Altar",
    878,
    [
      [882, "Statue above Double Tap"],
      [884, "Middle statue overhead"],
      [887, "Rocks beside the curved stairs"],
      [891, "Scaffolding: upper level"],
      [894, "Scaffolding: middle level"],
      [898, "Rocks right of the Mystery Box"],
    ],
  ],
]
stage(
  "ravens",
  "Raven location atlas",
  [805, 902],
  "Six areas · Follow the calls; shoot with the 9mm SAP",
  note(
    "Use this atlas during the shield-pool cycles. The creator says “30 spawns”; his area-by-area list contains <strong>29 viewpoints</strong> (5 + 3 + 5 + 3 + 7 + 6). They are preserved here without inventing a missing location. Some frames show the perch or aiming direction after the bird has been shot.",
  ) +
    ravenGroups
      .map(
        ([area, t, shots]) =>
          `<details class="atlas"><summary>${area}<span>${shots.length} viewpoints · ${stamp(t)}</span></summary>${gallery(shots.map(([time, title]) => [time, `${area} · ${title}`]))}</details>`,
      )
      .join(""),
  "Locate a calling raven for each charged-enemy cycle. You do not need to shoot every listed perch.",
)

stage(
  "shield-trial",
  "Record the pool order & complete the shield",
  [902, 1037],
  "Three charged Corpse Eaters → Radio symbols → Bloodraven trial",
  list([
    "Keep the charged Corpse Eater close enough that it does not despawn. Lead it to the <strong>currently sizzling pool</strong>, stand in the pool, and <strong>melee it with the shield equipped</strong>. The creator’s example takes two hits. Move away from its death explosion to avoid losing armor.",
    "A symbol appears in the pool. Record <strong>which pool was first</strong>; its symbol can be revisited. Find the next energized pool, shoot another raven, and repeat. Do this <strong>three times</strong>, recording the pool order.",
    "At Crash Site, lead a <strong>bomber zombie</strong> to the metal panel near Quick Revive. Stand on the opposite side so its explosion breaks the metal. Pick up <strong>both the radio and the separate speaker</strong>.",
    "Install the radio and speaker on their two rocks at the <strong>Blood Altar</strong>. Interacting with the radio cycles the symbol in the large pool.",
    "Revisit your <strong>first charged-enemy pool</strong> and inspect its symbol. Select that exact symbol with the radio, then <strong>kill one zombie in the large Blood Altar pool</strong> to submit it. Repeat for your second and third pools, in that order.",
    "After a correct sequence, the large pool flashes through multiple symbols. <strong>Only after this confirmation</strong>, let yourself be downed while standing in it to enter the shield trial. The creator says this scripted transition does not consume Quick Revive.",
    "Get shield kills in the trial. When the area attack comes, stand on the plate and <strong>hold ADS / aim to block</strong>. Do this twice. Deposit the upgraded shield in the <strong>round floor slot</strong> at the Ice Caves weapon ledge.",
  ]) +
    note(
      "The radio solution depends on your pool order and your symbols. Similar-looking symbols are easy to confuse. Compare the actual line shapes; the source screenshots are examples, not a universal three-symbol password.",
    ) +
    table(
      ["Record during your run", "What to keep"],
      [
        ["First charged-enemy kill", "Pool location + its symbol"],
        ["Second charged-enemy kill", "Pool location + its symbol"],
        ["Third charged-enemy kill", "Pool location + its symbol"],
      ],
    ) +
    gallery([
      [912, "Bring the charged enemy into the target pool"],
      [927, "Symbol left after a pool kill", "Record the order in your run."],
      [955, "Bomber target at Crash Site", "Break this metal panel to free the radio equipment."],
      [968, "Radio pickup", "Collect the radio and the separate speaker."],
      [969, "Speaker pickup", "A second item beside the broken metal."],
      [974, "Speaker placement at Blood Altar"],
      [977, "Radio placement and control"],
      [981, "Cycle and compare the large-pool symbol"],
      [998, "Submit each selected symbol with a kill"],
      [1026, "Shield trial: block on the plate"],
    ]),
  "Bloodraven trial complete; upgraded shield placed in the round Ice Caves slot.",
)

stage(
  "scythe-trial",
  "Finish the scythe & prepare for the boss",
  [1037, 1090],
  "Phylactery forge → Two round changes → Deathraven trial",
  list([
    "Return to the scythe left at its <strong>Phylactery upgrade spot</strong>. Kill zombies nearby until it glows. Then let <strong>two rounds pass</strong>.",
    "During that wait, prepare: <strong>fully overcharged red Frontline meter</strong>, <strong>full armor</strong>, and a <strong>Pack-a-Punched 9mm SAP</strong>. The creator suggests the melee perk, Stamin-Up, Quick Revive and Double Tap. Jack-in-the-Boxes are optional.",
    "After two rounds, pick up the scythe. It is temporarily unusable. Take a <strong>Pack-a-Punch transport</strong> to enter its trial.",
    "Kill the enemies with the scythe. The creator switches to a firearm for remaining Wüstlings when easier. Complete the trial and place the upgraded scythe in the <strong>last Ice Caves weapon slot</strong>.",
    "Check that all four weapons have been deposited: <strong>flail, hammer, shield and scythe</strong>. All four fires around the volcano ignite and dialogue plays.",
  ]) +
    gallery([
      [1039, "Scythe forge area"],
      [1050, "Boss preparation", "Overcharge Frontline and refill armor before entry."],
      [1083, "Scythe trial completed"],
    ]),
  "Four weapons deposited; four fires lit; boss transport opened.",
)

stage(
  "boss",
  "Enter the God-King fight",
  [1090, 1129],
  "Final check → Scythe + Frontline → Kingfall",
  note(
    "<strong>Finish your preparation before entering the new transport.</strong> This section follows the video’s fast solo scythe / Frontline method; its success depends on reaching the fight with that setup.",
  ) +
    list([
      "After the four fires light and the dialogue plays, <strong>pick the upgraded scythe back up</strong>. Confirm full armor and an overcharged red Frontline meter.",
      "Enter the <strong>newly opened boss transport</strong> shown below. A cutscene begins the encounter.",
      "Run to the God-King, <strong>activate Frontline</strong> and repeatedly melee him with the upgraded scythe. Follow him when he moves.",
      "If he is over a plate and cannot be hit, quickly kill nearby zombies, then resume attacking when he returns to his chair.",
      "Continue through the next cutscene. In the creator’s run, Frontline remains active afterward; keep attacking with the scythe until the final defeat and <strong>Kingfall</strong> achievement.",
    ]) +
    gallery(
      [
        [1094, "New boss transport at the Ice Caves"],
        [1100, "God-King: Frontline + upgraded scythe"],
      ],
      "wide",
    ),
  "God-King defeated; Kingfall unlocked.",
)

const chapters = JSON.parse(await fs.readFile(path.join(root, "chapters.json"), "utf8"))
const body = `<a class="skip" href="#opening">Skip to the walkthrough</a><header class="masthead"><div><p class="eyebrow">Call of Duty: WWII / Nazi Zombies / Solo</p><h1>Frozen Dawn<span>Kingfall field guide</span></h1><p class="byline">Based on <a href="${video}" target="_blank" rel="noreferrer">SchleyerZ’s 18:49 walkthrough</a> · 7 June 2025</p></div><a class="download" href="frozen-dawn-walkthrough.html" download>Save offline HTML ↓</a></header>
<div class="layout"><aside><nav aria-label="Walkthrough stages"><p class="nav-title">Playthrough order</p>${stages.map((s, i) => `<a href="#${s.id}"><span>${String(i + 1).padStart(2, "0")}</span>${s.title}</a>`).join("")}<a href="#chapters"><span>↗</span>All video chapters</a></nav><p class="aside-note">Times are video timestamps, not in-game rounds. Use your own rune codes and symbols.</p></aside><main><div class="quick"><span>Quick references</span><a href="#pillars">Pillars</a><a href="#orrery-chart">Cipher</a><a href="#constellations">Constellations</a><a href="#hammer-grid">Hammer wall</a><a href="#ravens">Ravens</a><a href="#shield-trial">Blood symbols</a></div><p class="intro">Follow the stages in order. Open any screenshot to inspect the location or pattern; each stage can play its part of the original video. Text and screenshots work offline in the saved HTML. Video playback needs internet.</p>
${stages.map((s, i) => `<section id="${s.id}" class="stage"><div class="stage-head"><div class="number">${String(i + 1).padStart(2, "0")}</div><div><p class="eyebrow">${s.kicker}</p><h2>${s.title}</h2><p class="stage-time">${stamp(s.range[0])}–${stamp(s.range[1])}</p></div></div><div class="stage-actions"><button class="play" data-start="${s.range[0]}" data-end="${s.range[1]}" data-title="${esc(s.title)}">▶ Play this stage</button>${watch(s.range[0], "Open on YouTube")}</div>${s.body}<p class="checkpoint"><span>Before moving on</span>${s.done}</p></section>`).join("")}
<section id="chapters" class="stage"><p class="eyebrow">Source index</p><h2>Every chapter, one click away</h2><div class="chapters">${chapters.map((c) => watch(c.t, c.title)).join("")}</div><p class="source-note">Summary and frame selections prepared from the supplied video’s transcript, chapter list and footage. Narration spelling has been corrected where the game labels are clear. The order follows the creator’s route; example rune codes, constellation shapes and pool symbols belong to that recorded run. Gameplay and screenshots belong to their respective owners. Original guide: <a href="${video}">SchleyerZ — *SOLO* Frozen Dawn Easter Egg Guide (2025), Kingfall Achievement</a>.</p></section></main></div>
<dialog id="viewer" aria-labelledby="viewer-title"><div class="dialog-bar"><h2 id="viewer-title">Reference</h2><button class="close" aria-label="Close reference">Close ×</button></div><div id="viewer-content"></div><p id="viewer-link"></p></dialog><footer>Frozen Dawn · Solo reference · ${shotSet.size} video frames · ${chapters.length} source chapters</footer>`
const css = await fs.readFile(path.join(root, "style.css"), "utf8")
const js = await fs.readFile(path.join(root, "reader.js"), "utf8")
const head = `<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="A chronological Frozen Dawn solo Easter egg guide with original video screenshots, puzzle charts, constellation viewpoints and raven locations."><title>Frozen Dawn — Kingfall solo field guide</title><style>${css}</style></head><body>`
await fs.writeFile(
  path.join(root, "index.html"),
  await localize(`${head}${body}<script>${js}</script></body></html>`, {
    collect: process.argv.includes("--catalog"),
  }),
)
await fs.writeFile(
  path.join(root, "selected-frames.json"),
  JSON.stringify([...shotSet].sort((a, b) => a - b)),
)
console.log(
  JSON.stringify({ stages: stages.length, chapters: chapters.length, frames: shotSet.size }),
)
