import { Link, useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SeoFooter } from "@/components/seo-footer";
import { SeoHead } from "@/components/seo-head";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  MapPin,
  CheckCircle,
  Clock,
  Euro,
  Shield,
  Bath,
  Home as HomeIcon,
  Building,
  Hammer,
  HelpCircle,
  Phone,
  ArrowRight
} from "lucide-react";
import { GlobalHero, HeroContent } from "@/components/global-hero";
import stadtteilImg from "@assets/generated_images/modern_renovated_home_interior.png";

interface StadtteilData {
  name: string;
  slug: string;
  beschreibung: string;
  besonderheiten: string[];
  altbauAnteil: string;
  typischeObjekte: string[];
}

const stadtteile: Record<string, StadtteilData> = {
  "schwabing": {
    name: "Schwabing",
    slug: "schwabing",
    beschreibung: "Schwabing ist bekannt für seine wunderschönen Altbauten aus der Gründerzeit. Viele Gebäude stammen aus den Jahren 1890-1920 und bieten hohes Sanierungspotenzial mit Stuck, hohen Decken und Parkettböden.",
    besonderheiten: ["Hoher Altbaubestand", "Gründerzeit-Architektur", "Denkmalschutz beachten"],
    altbauAnteil: "ca. 65%",
    typischeObjekte: ["3-5 Zimmer Altbauwohnungen", "Jugendstil-Häuser", "Reihenhäuser"]
  },
  "bogenhausen": {
    name: "Bogenhausen",
    slug: "bogenhausen",
    beschreibung: "Bogenhausen gehört zu den exklusivsten Wohnlagen Münchens. Hier finden sich repräsentative Villen, großzügige Einfamilienhäuser und hochwertige Eigentumswohnungen, die oft aufwendige Sanierungen erfordern.",
    besonderheiten: ["Exklusive Villenlage", "Großzügige Grundstücke", "Hochwertige Sanierungsstandards"],
    altbauAnteil: "ca. 45%",
    typischeObjekte: ["Villen", "Einfamilienhäuser", "Luxus-Eigentumswohnungen"]
  },
  "maxvorstadt": {
    name: "Maxvorstadt",
    slug: "maxvorstadt",
    beschreibung: "Die Maxvorstadt ist das Universitätsviertel Münchens mit vielen denkmalgeschützten Gebäuden. Hier sanieren wir häufig Altbauwohnungen für Studenten, junge Familien und Akademiker.",
    besonderheiten: ["Universitätsnähe", "Viele Denkmalschutz-Objekte", "Kompakte Wohnungsgrößen"],
    altbauAnteil: "ca. 70%",
    typischeObjekte: ["1-3 Zimmer Altbauwohnungen", "WG-geeignete Wohnungen", "Ladenlokale mit Wohnung"]
  },
  "haidhausen": {
    name: "Haidhausen",
    slug: "haidhausen",
    beschreibung: "Das Franzosenviertel in Haidhausen ist geprägt von charmanten Altbauten und einem lebendigen Kiezcharakter. Viele Eigentümer investieren hier in behutsame Sanierungen, die den historischen Charme erhalten.",
    besonderheiten: ["Franzosenviertel", "Lebendiges Viertel", "Historischer Charme"],
    altbauAnteil: "ca. 60%",
    typischeObjekte: ["2-4 Zimmer Altbauwohnungen", "Reihenhäuser", "Gewerbeobjekte"]
  },
  "sendling": {
    name: "Sendling",
    slug: "sendling",
    beschreibung: "Sendling bietet eine Mischung aus Altbau und Nachkriegsbestand. Besonders beliebt ist die Großmarkthallen-Nähe. Hier sanieren wir oft für Familien und Paare, die zentral wohnen möchten.",
    besonderheiten: ["Gemischter Bestand", "Familienfreundlich", "Gute Infrastruktur"],
    altbauAnteil: "ca. 40%",
    typischeObjekte: ["3-4 Zimmer Wohnungen", "Nachkriegsbauten", "Reihenhäuser"]
  },
  "neuhausen": {
    name: "Neuhausen-Nymphenburg",
    slug: "neuhausen",
    beschreibung: "Neuhausen-Nymphenburg ist ein beliebtes Familienviertel mit vielen Altbauten und Grünflächen. Die Nähe zum Nymphenburger Schlosspark macht das Viertel besonders attraktiv.",
    besonderheiten: ["Schlossnähe", "Viele Grünflächen", "Familienfreundlich"],
    altbauAnteil: "ca. 50%",
    typischeObjekte: ["Einfamilienhäuser", "Großzügige Altbauwohnungen", "Villen"]
  },
  "pasing": {
    name: "Pasing",
    slug: "pasing",
    beschreibung: "Pasing hat sich vom ehemaligen Dorf zum beliebten Wohnviertel entwickelt. Hier finden sich viele Einfamilienhäuser und Reihenhäuser aus verschiedenen Epochen mit Sanierungsbedarf.",
    besonderheiten: ["Eigenheime dominieren", "Gute S-Bahn-Anbindung", "Vielfältiger Bestand"],
    altbauAnteil: "ca. 35%",
    typischeObjekte: ["Einfamilienhäuser", "Reihenhäuser", "Doppelhaushälften"]
  },
  "giesing": {
    name: "Giesing",
    slug: "giesing",
    beschreibung: "Giesing ist ein traditionelles Arbeiterviertel mit zunehmender Gentrifizierung. Viele Altbauten werden hier saniert und modernisiert, während der ursprüngliche Charakter erhalten bleibt.",
    besonderheiten: ["Traditionelles Viertel", "Aufstrebende Lage", "Bezahlbare Objekte"],
    altbauAnteil: "ca. 55%",
    typischeObjekte: ["2-3 Zimmer Altbauwohnungen", "Mehrfamilienhäuser", "Gewerbeobjekte"]
  },
  "lehel": {
    name: "Lehel",
    slug: "lehel",
    beschreibung: "Das Lehel ist eines der ältesten Viertel Münchens und liegt zwischen Altstadt und Isar. Die historischen Gebäude erfordern oft besondere Sorgfalt bei der Sanierung.",
    besonderheiten: ["Zentrumsnah", "Historischer Bestand", "Isarnähe"],
    altbauAnteil: "ca. 75%",
    typischeObjekte: ["Historische Stadtvillen", "Altbauwohnungen", "Denkmalgeschützte Objekte"]
  },
  "trudering": {
    name: "Trudering-Riem",
    slug: "trudering",
    beschreibung: "Trudering-Riem bietet viel Grün und ist besonders bei Familien beliebt. Der Stadtteil hat viele Einfamilienhäuser und Reihenhäuser aus den 1950er-70er Jahren, die Kernsanierungen benötigen.",
    besonderheiten: ["Familienfreundlich", "Viel Grün", "Nachkriegsbestand"],
    altbauAnteil: "ca. 25%",
    typischeObjekte: ["Einfamilienhäuser", "Reihenhäuser", "Doppelhaushälften"]
  },
  "allach": {
    name: "Allach-Untermenzing",
    slug: "allach",
    beschreibung: "Allach-Untermenzing ist ein ruhiges Wohnviertel im Nordwesten Münchens mit vielen Einfamilienhäusern und dörflichem Charakter.",
    besonderheiten: ["Ruhige Wohnlage", "Dörflicher Charakter", "Gute Anbindung"],
    altbauAnteil: "ca. 30%",
    typischeObjekte: ["Einfamilienhäuser", "Doppelhaushälften", "Bauernhäuser"]
  },
  "untermenzing": {
    name: "Untermenzing",
    slug: "untermenzing",
    beschreibung: "Untermenzing bietet eine Mischung aus historischen Gebäuden und modernen Wohnanlagen mit guter Infrastruktur.",
    besonderheiten: ["Historischer Ortskern", "Familienfreundlich", "Grünflächen"],
    altbauAnteil: "ca. 35%",
    typischeObjekte: ["Einfamilienhäuser", "Reihenhäuser", "Eigentumswohnungen"]
  },
  "obermenzing": {
    name: "Obermenzing",
    slug: "obermenzing",
    beschreibung: "Obermenzing ist ein gehobenes Wohnviertel mit vielen Villen und großzügigen Grundstücken nahe dem Schloss Blutenburg.",
    besonderheiten: ["Villenviertel", "Schlossnähe", "Exklusive Lage"],
    altbauAnteil: "ca. 40%",
    typischeObjekte: ["Villen", "Einfamilienhäuser", "Herrschaftliche Anwesen"]
  },
  "aubing": {
    name: "Aubing-Lochhausen",
    slug: "aubing",
    beschreibung: "Aubing ist ein familienfreundlicher Stadtteil mit guter S-Bahn-Anbindung und vielen Neubaugebieten neben älterem Bestand.",
    besonderheiten: ["Gute Verkehrsanbindung", "Neubaugebiete", "Bezahlbare Lagen"],
    altbauAnteil: "ca. 25%",
    typischeObjekte: ["Reihenhäuser", "Doppelhaushälften", "Eigentumswohnungen"]
  },
  "moosach": {
    name: "Moosach",
    slug: "moosach",
    beschreibung: "Moosach verbindet urbanes Leben mit grünen Oasen. Das Olympia-Einkaufszentrum sorgt für gute Infrastruktur.",
    besonderheiten: ["Zentrale Lage", "Gute Infrastruktur", "Olympiapark-Nähe"],
    altbauAnteil: "ca. 35%",
    typischeObjekte: ["Mehrfamilienhäuser", "Eigentumswohnungen", "Reihenhäuser"]
  },
  "feldmoching": {
    name: "Feldmoching-Hasenbergl",
    slug: "feldmoching",
    beschreibung: "Feldmoching bietet im Norden noch dörfliche Strukturen mit Bauernhöfen und Einfamilienhäusern.",
    besonderheiten: ["Dörflicher Charakter", "Viel Natur", "Entwicklungspotential"],
    altbauAnteil: "ca. 30%",
    typischeObjekte: ["Bauernhäuser", "Einfamilienhäuser", "Reihenhäuser"]
  },
  "laim": {
    name: "Laim",
    slug: "laim",
    beschreibung: "Laim ist ein beliebtes Wohnviertel mit guter Verkehrsanbindung und Mischung aus Alt- und Neubau.",
    besonderheiten: ["Zentrale Lage", "Gute U-Bahn-Anbindung", "Lebendiges Viertel"],
    altbauAnteil: "ca. 45%",
    typischeObjekte: ["Altbauwohnungen", "Mehrfamilienhäuser", "Reihenhäuser"]
  },
  "nymphenburg": {
    name: "Nymphenburg",
    slug: "nymphenburg",
    beschreibung: "Nymphenburg ist geprägt vom berühmten Schloss und seinen Parks. Exklusive Wohnlagen mit historischen Villen.",
    besonderheiten: ["Schlosspark", "Exklusive Villen", "Historisches Ambiente"],
    altbauAnteil: "ca. 55%",
    typischeObjekte: ["Villen", "Historische Stadtvillen", "Luxuswohnungen"]
  },
  "berg-am-laim": {
    name: "Berg am Laim",
    slug: "berg-am-laim",
    beschreibung: "Berg am Laim ist ein aufstrebendes Viertel mit guter Anbindung und vielen Sanierungsprojekten.",
    besonderheiten: ["Gute Anbindung", "Aufstrebend", "Bezahlbare Lagen"],
    altbauAnteil: "ca. 40%",
    typischeObjekte: ["Mehrfamilienhäuser", "Eigentumswohnungen", "Reihenhäuser"]
  },
  "riem": {
    name: "Riem",
    slug: "riem",
    beschreibung: "Riem bietet moderne Wohnanlagen rund um die Messestadt und den Riemer Park mit viel Grün.",
    besonderheiten: ["Messestadt", "Moderne Architektur", "Riemer Park"],
    altbauAnteil: "ca. 15%",
    typischeObjekte: ["Neubauwohnungen", "Reihenhäuser", "Townhouses"]
  },
  "milbertshofen": {
    name: "Milbertshofen-Am Hart",
    slug: "milbertshofen",
    beschreibung: "Milbertshofen ist geprägt von BMW und dem Olympiagelände. Vielfältige Wohnlagen vom Arbeiterviertel bis zur gehobenen Lage.",
    besonderheiten: ["BMW-Nähe", "Olympiapark", "Vielfältig"],
    altbauAnteil: "ca. 40%",
    typischeObjekte: ["Mehrfamilienhäuser", "Eigentumswohnungen", "Reihenhäuser"]
  },
  "freimann": {
    name: "Freimann",
    slug: "freimann",
    beschreibung: "Freimann verbindet Wohnen mit Natur an der Isar und bietet durch die Allianz Arena besondere Infrastruktur.",
    besonderheiten: ["Isarnähe", "Allianz Arena", "Grüne Oase"],
    altbauAnteil: "ca. 30%",
    typischeObjekte: ["Einfamilienhäuser", "Reihenhäuser", "Eigentumswohnungen"]
  },
  "solln": {
    name: "Solln",
    slug: "solln",
    beschreibung: "Solln ist ein exklusives Villenviertel im Süden Münchens mit viel Grün und gehobener Wohnqualität.",
    besonderheiten: ["Villenviertel", "Exklusive Lage", "Viel Grün"],
    altbauAnteil: "ca. 50%",
    typischeObjekte: ["Villen", "Einfamilienhäuser", "Luxuswohnungen"]
  },
  "grosshadern": {
    name: "Großhadern",
    slug: "grosshadern",
    beschreibung: "Großhadern ist bekannt für die Uni-Klinik und bietet ruhiges Wohnen mit guter Infrastruktur.",
    besonderheiten: ["Klinikum-Nähe", "Ruhige Wohnlage", "Gute Anbindung"],
    altbauAnteil: "ca. 35%",
    typischeObjekte: ["Einfamilienhäuser", "Reihenhäuser", "Mehrfamilienhäuser"]
  },
  "hadern": {
    name: "Hadern",
    slug: "hadern",
    beschreibung: "Hadern bietet familienfreundliches Wohnen mit vielen Einfamilienhäusern und grünen Straßen.",
    besonderheiten: ["Familienfreundlich", "Ruhig", "Gewachsene Struktur"],
    altbauAnteil: "ca. 40%",
    typischeObjekte: ["Einfamilienhäuser", "Doppelhaushälften", "Reihenhäuser"]
  },
  "fuerstenried": {
    name: "Fürstenried",
    slug: "fuerstenried",
    beschreibung: "Fürstenried liegt am südlichen Stadtrand und bietet eine Mischung aus Einfamilienhäusern und Wohnanlagen.",
    besonderheiten: ["Stadtrandlage", "Naherholung", "Bezahlbar"],
    altbauAnteil: "ca. 30%",
    typischeObjekte: ["Einfamilienhäuser", "Reihenhäuser", "Eigentumswohnungen"]
  },
  "forstenried": {
    name: "Forstenried",
    slug: "forstenried",
    beschreibung: "Forstenried grenzt an den Forstenrieder Park und bietet naturnahes Wohnen mit guter Infrastruktur.",
    besonderheiten: ["Waldnähe", "Naturnahes Wohnen", "Familienfreundlich"],
    altbauAnteil: "ca. 35%",
    typischeObjekte: ["Einfamilienhäuser", "Reihenhäuser", "Doppelhaushälften"]
  },
  "thalkirchen": {
    name: "Thalkirchen-Obersendling",
    slug: "thalkirchen",
    beschreibung: "Thalkirchen liegt direkt an der Isar mit dem beliebten Tierpark und bietet attraktive Wohnlagen.",
    besonderheiten: ["Isarnähe", "Tierpark", "Beliebte Wohnlage"],
    altbauAnteil: "ca. 45%",
    typischeObjekte: ["Altbauwohnungen", "Villen", "Einfamilienhäuser"]
  },
  "obersendling": {
    name: "Obersendling",
    slug: "obersendling",
    beschreibung: "Obersendling ist ein aufstrebendes Viertel mit vielen Gewerbeflächen und neuen Wohnprojekten.",
    besonderheiten: ["Aufstrebend", "Gute Anbindung", "Entwicklungspotential"],
    altbauAnteil: "ca. 35%",
    typischeObjekte: ["Mehrfamilienhäuser", "Eigentumswohnungen", "Lofts"]
  },
  "ramersdorf": {
    name: "Ramersdorf-Perlach",
    slug: "ramersdorf",
    beschreibung: "Ramersdorf bietet bezahlbares Wohnen mit guter U-Bahn-Anbindung und vielfältiger Bebauung.",
    besonderheiten: ["Bezahlbar", "Gute Anbindung", "Vielfältig"],
    altbauAnteil: "ca. 30%",
    typischeObjekte: ["Mehrfamilienhäuser", "Eigentumswohnungen", "Reihenhäuser"]
  },
  "perlach": {
    name: "Perlach",
    slug: "perlach",
    beschreibung: "Perlach hat einen historischen Ortskern und moderne Wohnanlagen. Beliebtes Familienviertel.",
    besonderheiten: ["Historischer Kern", "Familienfreundlich", "Gute Infrastruktur"],
    altbauAnteil: "ca. 25%",
    typischeObjekte: ["Reihenhäuser", "Doppelhaushälften", "Eigentumswohnungen"]
  },
  "neuperlach": {
    name: "Neuperlach",
    slug: "neuperlach",
    beschreibung: "Neuperlach ist eine der größten Satellitenstädte Europas mit vielen Hochhäusern aus den 1970ern.",
    besonderheiten: ["Großsiedlung", "Gute Anbindung", "Sanierungsbedarf"],
    altbauAnteil: "ca. 5%",
    typischeObjekte: ["Hochhauswohnungen", "Eigentumswohnungen", "Reihenhäuser"]
  },
  "dachau": {
    name: "Dachau",
    slug: "dachau",
    beschreibung: "Dachau ist eine historische Stadt im Münchner Umland mit malerischer Altstadt und vielen sanierungsbedürftigen Altbauten.",
    besonderheiten: ["Historische Altstadt", "S-Bahn-Anbindung", "Bezahlbarer als München"],
    altbauAnteil: "ca. 45%",
    typischeObjekte: ["Einfamilienhäuser", "Altbauwohnungen", "Reihenhäuser"]
  },
  "karlsfeld": {
    name: "Karlsfeld",
    slug: "karlsfeld",
    beschreibung: "Karlsfeld liegt zwischen München und Dachau und bietet familienfreundliches Wohnen mit guter Anbindung.",
    besonderheiten: ["München-Nähe", "Familienfreundlich", "Gute Infrastruktur"],
    altbauAnteil: "ca. 30%",
    typischeObjekte: ["Einfamilienhäuser", "Reihenhäuser", "Doppelhaushälften"]
  },
  "germering": {
    name: "Germering",
    slug: "germering",
    beschreibung: "Germering ist die zweitgrößte Stadt im Landkreis und bietet vielfältige Wohnmöglichkeiten.",
    besonderheiten: ["Große Stadt", "Gute Infrastruktur", "S-Bahn-Anbindung"],
    altbauAnteil: "ca. 35%",
    typischeObjekte: ["Einfamilienhäuser", "Eigentumswohnungen", "Reihenhäuser"]
  },
  "fuerstenfeldbruck": {
    name: "Fürstenfeldbruck",
    slug: "fuerstenfeldbruck",
    beschreibung: "Fürstenfeldbruck ist Kreisstadt mit historischem Kloster und charmantem Stadtzentrum.",
    besonderheiten: ["Historisches Kloster", "Kreisstadt", "Amper-Nähe"],
    altbauAnteil: "ca. 40%",
    typischeObjekte: ["Altbauwohnungen", "Einfamilienhäuser", "Historische Gebäude"]
  },
  "freising": {
    name: "Freising",
    slug: "freising",
    beschreibung: "Freising ist Domstadt mit historischer Bedeutung und liegt nahe dem Flughafen München.",
    besonderheiten: ["Domstadt", "Flughafennähe", "Universitätsstadt"],
    altbauAnteil: "ca. 50%",
    typischeObjekte: ["Historische Stadthäuser", "Altbauwohnungen", "Einfamilienhäuser"]
  },
  "starnberg": {
    name: "Starnberg",
    slug: "starnberg",
    beschreibung: "Starnberg am Starnberger See ist eine der exklusivsten Wohnlagen im Münchner Umland.",
    besonderheiten: ["Seelage", "Exklusiv", "Höchste Immobilienpreise"],
    altbauAnteil: "ca. 45%",
    typischeObjekte: ["Villen", "Seevillen", "Luxuswohnungen"]
  },
  "garching": {
    name: "Garching",
    slug: "garching",
    beschreibung: "Garching ist Universitätsstadt mit TU-Campus und moderner Infrastruktur.",
    besonderheiten: ["TU München", "Forschungszentren", "U-Bahn-Anbindung"],
    altbauAnteil: "ca. 25%",
    typischeObjekte: ["Neubauwohnungen", "Einfamilienhäuser", "Reihenhäuser"]
  },
  "unterschleissheim": {
    name: "Unterschleißheim",
    slug: "unterschleissheim",
    beschreibung: "Unterschleißheim liegt nördlich von München mit guter S-Bahn-Anbindung und vielen Gewerbegebieten.",
    besonderheiten: ["Gute Anbindung", "Gewerbezentren", "Familienfreundlich"],
    altbauAnteil: "ca. 30%",
    typischeObjekte: ["Reihenhäuser", "Einfamilienhäuser", "Eigentumswohnungen"]
  },
  "oberschleissheim": {
    name: "Oberschleißheim",
    slug: "oberschleissheim",
    beschreibung: "Oberschleißheim ist bekannt für das Schloss Schleißheim und bietet ruhiges Wohnen im Grünen.",
    besonderheiten: ["Schloss Schleißheim", "Flugwerft", "Grüne Lage"],
    altbauAnteil: "ca. 35%",
    typischeObjekte: ["Einfamilienhäuser", "Reihenhäuser", "Historische Gebäude"]
  },
  "ottobrunn": {
    name: "Ottobrunn",
    slug: "ottobrunn",
    beschreibung: "Ottobrunn ist eine moderne Gemeinde südöstlich von München mit vielen Forschungseinrichtungen.",
    besonderheiten: ["High-Tech-Standort", "Gute Infrastruktur", "Moderne Bebauung"],
    altbauAnteil: "ca. 20%",
    typischeObjekte: ["Einfamilienhäuser", "Reihenhäuser", "Eigentumswohnungen"]
  },
  "haar": {
    name: "Haar",
    slug: "haar",
    beschreibung: "Haar liegt östlich von München und bietet familienfreundliches Wohnen mit S-Bahn-Anbindung.",
    besonderheiten: ["S-Bahn-Anbindung", "Familienfreundlich", "Klinikum"],
    altbauAnteil: "ca. 30%",
    typischeObjekte: ["Einfamilienhäuser", "Doppelhaushälften", "Reihenhäuser"]
  },
  "graefelfing": {
    name: "Gräfelfing",
    slug: "graefelfing",
    beschreibung: "Gräfelfing ist eine exklusive Villengemeinde westlich von München mit viel Grün.",
    besonderheiten: ["Villengemeinde", "Waldnähe", "Exklusiv"],
    altbauAnteil: "ca. 50%",
    typischeObjekte: ["Villen", "Einfamilienhäuser", "Luxuswohnungen"]
  },
  "planegg": {
    name: "Planegg",
    slug: "planegg",
    beschreibung: "Planegg liegt westlich von München und bietet gehobenes Wohnen nahe dem Forstenrieder Park.",
    besonderheiten: ["Waldnähe", "Gehoben", "Gute Anbindung"],
    altbauAnteil: "ca. 40%",
    typischeObjekte: ["Einfamilienhäuser", "Villen", "Reihenhäuser"]
  },
  "pullach": {
    name: "Pullach",
    slug: "pullach",
    beschreibung: "Pullach im Isartal ist eine exklusive Gemeinde mit vielen Villen und direktem Isarzugang.",
    besonderheiten: ["Isartal", "Exklusiv", "Naturnahes Wohnen"],
    altbauAnteil: "ca. 45%",
    typischeObjekte: ["Villen", "Einfamilienhäuser", "Luxusanwesen"]
  },
  "gruenwald": {
    name: "Grünwald",
    slug: "gruenwald",
    beschreibung: "Grünwald ist die exklusivste Gemeinde im Münchner Süden mit Villen und Prominenz.",
    besonderheiten: ["Höchste Grundstückspreise", "Prominentenwohnort", "Bavaria Filmstadt"],
    altbauAnteil: "ca. 50%",
    typischeObjekte: ["Villen", "Luxusanwesen", "Herrschaftliche Häuser"]
  }
};

const allgemeineLeistungen = [
  { icon: Bath, title: "Badsanierung", preis: "ab 9.200€" },
  { icon: HomeIcon, title: "Komplettsanierung", preis: "ab 920€/m²" },
  { icon: Building, title: "Wohnungssanierung", preis: "ab 800€/m²" },
  { icon: Hammer, title: "Kernsanierung", preis: "ab 1.200€/m²" }
];

interface StadtteilPageProps {
  stadtteil: string;
}

function StadtteilContent({ stadtteil }: StadtteilPageProps) {
  const data = stadtteile[stadtteil];
  
  if (!data) {
    return null;
  }

  const stadtteilHeroContent: HeroContent = {
    backgroundImage: stadtteilImg,
    badge: `Ihr Sanierungspartner in ${data.name}`,
    titleLine1: `Sanierung in ${data.name}.`,
    titleLine2: "Lokal & zum Festpreis.",
    descriptions: [`Wir kennen ${data.name} und seine Gebäude.`, "Altbau-Spezialisten vor Ort."],
    strongText: "Festpreisgarantie.",
    subText: `${data.beschreibung.split('.')[0]}.`,
    ctaText: `Jetzt Angebot für ${data.name}`,
    ctaLink: "/anfrage",
    checkmarks: [`Lokale Expertise ${data.name}`, "5 Jahre Gewährleistung", "Beratung in 24h"],
    dataTestIdPrefix: data.slug
  };

  const faqs = [
    {
      frage: `Wie lange dauert eine Sanierung in ${data.name}?`,
      antwort: `Die Dauer hängt vom Umfang ab. Eine Badsanierung in ${data.name}: 2-3 Wochen. Eine Komplettsanierung: 6-12 Wochen je nach Größe. Wir nennen Ihnen den genauen Zeitrahmen im Angebot.`
    },
    {
      frage: `Gibt es Besonderheiten bei Altbausanierungen in ${data.name}?`,
      antwort: `${data.name} hat ${data.altbauAnteil} Altbaubestand. ${data.beschreibung.split('.')[0]}. Wir kennen die lokalen Gegebenheiten und arbeiten bei Bedarf eng mit dem Denkmalschutz zusammen.`
    },
    {
      frage: `Kommen Sie auch für kleinere Projekte nach ${data.name}?`,
      antwort: `Ja, wir übernehmen auch einzelne Gewerke wie Badsanierungen oder Bodensanierungen in ${data.name}. Ab einem Auftragsvolumen von 5.000€ sind wir Ihr Partner.`
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title={`Sanierung ${data.name} München | Festpreis | 089-Sanierer`}
        description={`Sanierung in ${data.name}: Badsanierung, Komplettsanierung, Kernsanierung zum Festpreis. Lokaler Anbieter mit 5 Jahren Gewährleistung. Kostenlose Beratung.`}
        canonicalPath={`/muenchen-${data.slug}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": `Sanierung ${data.name} München`,
          "provider": {"@id": "https://089-sanierer.de/#organization"},
          "areaServed": {
            "@type": "City",
            "name": `München ${data.name}`
          },
          "description": `Professionelle Sanierungsleistungen in München ${data.name}`
        }}
      />
      <SiteHeader />

      <main>
        <GlobalHero content={stadtteilHeroContent} />

        <section className="py-4 lg:py-6 bg-background">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Unsere Leistungen in {data.name}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allgemeineLeistungen.map((item) => (
                <Card key={item.title}>
                  <CardContent className="p-6 text-center">
                    <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-primary font-bold">{item.preis}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-accent/30">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Besonderheiten in {data.name}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 justify-center">
              <div className="flex flex-col items-center md:items-start">
                <h3 className="font-semibold text-lg mb-4">Stadtteil-Charakteristik</h3>
                <ul className="space-y-3">
                  {data.besonderheiten.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Altbauanteil: {data.altbauAnteil}</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <h3 className="font-semibold text-lg mb-4">Typische Objekte</h3>
                <ul className="space-y-3">
                  {data.typischeObjekte.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-background">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Ihre Vorteile
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <Euro className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Festpreisgarantie</h3>
                <p className="text-muted-foreground text-sm">
                  Der genannte Preis ist der Endpreis.
                </p>
              </div>
              <div className="text-center p-6">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Lokal in München</h3>
                <p className="text-muted-foreground text-sm">
                  Wir kennen {data.name} und seine Besonderheiten.
                </p>
              </div>
              <div className="text-center p-6">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">5 Jahre Garantie</h3>
                <p className="text-muted-foreground text-sm">
                  Langfristige Gewährleistung auf alle Arbeiten.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-accent/30">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
              <HelpCircle className="w-8 h-8 text-primary" />
              Häufige Fragen
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left" data-testid={`faq-${data.slug}-${index}`}>
                    {faq.frage}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.antwort}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-6 lg:py-10 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {data.name} verdient nur die beste Sanierung!
            </h2>
            <div className="text-lg opacity-90 mb-4 flex flex-col gap-1">
              <span>Wir kennen die Bausubstanz und Besonderheiten in {data.name}.</span>
              <span><strong>Ihr lokaler Partner für hochwertige Sanierungen.</strong></span>
            </div>
            <div className="text-base opacity-80 mb-6 flex flex-col gap-0.5">
              <span>Kurze Wege, schnelle Reaktionszeiten, persönliche Betreuung.</span>
              <span>Festpreis. Fester Termin. Münchner Qualität.</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/anfrage">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white h-14 px-8 text-lg font-semibold shadow-xl" data-testid={`button-anfrage-${data.slug}-cta`}>
                  Ja, Projekt in {data.name} starten
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="tel:+498944438872">
                <Button size="lg" variant="outline" className="border-white/40 text-white h-14 px-6">
                  <Phone className="w-5 h-5 mr-2" />
                  Lokale Beratung anfordern
                </Button>
              </a>
            </div>
            <p className="mt-6 text-sm opacity-70">
              100% kostenlos. Beratung vor Ort in {data.name}. Festpreisangebot in 24 Stunden.
            </p>
          </div>
        </section>
      </main>

      <SeoFooter />
    </div>
  );
}

export default function StadtteilPage() {
  const [location] = useLocation();
  
  // Extract slug safely: remove /muenchen- prefix or just /, trailing slashes, and query params
  let stadtteil = location
    .split('?')[0]           // Remove query parameters
    .replace(/^\/muenchen-/, '')  // Remove /muenchen- prefix
    .replace(/^\//, '')      // Remove leading slash (for Umland cities like /graefelfing)
    .replace(/\/$/, '')      // Remove trailing slash
    .toLowerCase()           // Normalize to lowercase
    .trim();
  
  if (!stadtteile[stadtteil]) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Stadtteil nicht gefunden</h1>
          <Link href="/">
            <Button>Zurück zur Startseite</Button>
          </Link>
        </div>
      </div>
    );
  }

  return <StadtteilContent stadtteil={stadtteil} />;
}

export { stadtteile };
