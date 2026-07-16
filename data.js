// Finanz-Stammtisch member data — the one file you edit to keep the map current.
//
// To add or move a member: add/adjust a row in `members`. If the member's city
// is not yet in `cities`, add it there with its [lon, lat] (city-center is fine,
// look it up on openstreetmap.org). Then commit + push — the page redeploys itself.
//
// `neutral` holds central cities nobody lives in but the group could still meet
// in; they show up as dashed candidate pins in the Treffpunkt-Check.
window.STAMMTISCH = {
  members: [
    { name: "Lara",    city: "Berlin" },
    { name: "Holger",  city: "Bonn" },
    { name: "Daniel",  city: "Wiesbaden" },
    { name: "Andres",  city: "Mainz" },
    { name: "Carsten", city: "Mainz" },
    { name: "Chris",   city: "Mainz" },
    { name: "Julia",   city: "Mainz" },
    { name: "Jannis",  city: "Mainz" },
    { name: "Alper",   city: "Kassel" },
    { name: "Stephan", city: "Kassel" },
    { name: "Niklas",  city: "Frankfurt am Main" },
    { name: "Benni",   city: "Leonberg" },
    { name: "Alex",    city: "Hamburg" },
    { name: "Walle",   city: "Stuttgart" },
  ],

  // [lon, lat] for every city a member lives in
  cities: {
    "Berlin":            [13.4050, 52.5200],
    "Hamburg":           [ 9.9937, 53.5511],
    "Bonn":              [ 7.0982, 50.7374],
    "Wiesbaden":         [ 8.2398, 50.0782],
    "Mainz":             [ 8.2473, 49.9929],
    "Frankfurt am Main": [ 8.6821, 50.1109],
    "Kassel":            [ 9.4797, 51.3127],
    "Leonberg":          [ 9.0130, 48.8014],
    "Stuttgart":         [ 9.1829, 48.7758],
  },

  // neutral central candidate cities nobody lives in
  neutral: {
    "Fulda":    [ 9.6808, 50.5558],
    "Gießen":   [ 8.6784, 50.5841],
    "Würzburg": [ 9.9534, 49.7913],
    "Marburg":  [ 8.7708, 50.8090],
    "Erfurt":   [11.0328, 50.9787],
  },
};
