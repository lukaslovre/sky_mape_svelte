# TODO

## Danas:

## Ostatak:

- selected property basic

- editanje polygona
  - kad se stisne polygon se pokaže popup sa edit|delete gumbima
- kada se stisne nekretina, sidebar je detailed view nekretnine
  - ikona na mapi ima 'selected' state
  - postoje strelice lijevo|desno za prolaženje kroz sve filteredProperties
- menubar na owner

## MVP

- spremanje klijenata
- spremanje nekretnina
- filtriranje (matchanje)

## Glavni plan

1. riješiti dupliciranje nekretnina (data import from CVS i/ili API integracija)

## Low

- [ ] auth

- [ ] Na property gridu imati kao grid divider i onda su ispod "favoriti koji ne matchaju filtere"

- [ ] Mogućnost priložiti/spremiti dokumente koji su onda povezani sa nekom nekretninom te se mogu brzo pristupiti. Na buyers mora bit isto tablica jer je ovo vec previse polja i gumba. Kad se stisne na mapi na nekretninu onda je samo 1 nekretnina odabrana i prikazana na listi. Ima polje dokumenti koji isto izbaci side-note sa svim file-ovima, google drive style.

- [ ] Srediti lijepo side-note funkcionalnost (UI)

- [ ] Editanje polygona (micanje rubova, tog tipa) -> za ovo već nešto postoji, vidjet možda ako je dovoljno "lean".
- [ ] Na hover polygona u listi polygona se promjeni boja odgovarajućeg polygona na mapi tako da se zna koji se hovera

- [ ] Imat gumb sa više opcija za polygone korisnika:
  - [ ] gumb da se vide samo viable kupci
  - [ ] gumb da se vide svi kupci
  - [ ] gumb da se vide
- [ ] Može se save-at temporary nekretnina nakon šta se edita da postane "prava"

## Kasnije od kasnije

- [ ] Shift click -> multiple select -> promjeni se kursor
- [ ] Klik na adresu u kartici prebacuje na `Map` tab i prikazuje adresu na mapi
- [ ] Klik na `Nacrtaj` filter prebaci na `Map` tab ako nije već tamo

# Pitanja za kolegu

1. Planirate li u budućnosti da svaki agent ima svoj korisnički račun, pri čemu ne bi svi agenti imali pristup istim nekretninama?
2. Jesu li off-market nekretnine privatne, tj. imaju li pristup informacijama o njima samo određeni agenti, ili su svi zaposlenici svjesni tih nekretnina?
3. Treba li za svaku nekretninu biti određen agent koji je odgovoran za nju, ili svi agenti mogu raditi na prodaji svih nekretnina?
4. Trebate li funkcionalnost za pohranu dokumenata (ugovora, izjava, itd.) vezanih uz određene nekretnine, ili vam odgovara trenutni način na koji pohranjujete dokumente?
5. Želite li zaseban atribut "spremnosti" za klijente (npr. razina zainteresiranosti ili spremnosti za kupnju), ili je dovoljno da te informacije budu unesene kao bilješke u profilu kupca?

# Ideje

- koristiti LLM da napiše email za lead (potencijalno: da napiše poseban email za svakog, ovisno o njegovim preferencijama)

# Botove ideje (hvala bot)

- Keyword Search: Allow users to search properties using specific keywords (e.g., "pool," "renovated kitchen").

  - ne znam jel ovo validno, ali da ai promjeni sve notepadove u jedan rod/vrijeme šta već, tako da se može filtrirat neovisno o padežu. ovo treba stvarno izvest i onda prodavat pro verziju s ovima duplo više
  - isto tako nekako detektirati kada se spominje broj u opisu i onda da se može searchat ">5"

- Amenities and Features: Add filters for amenities like parking, gyms, pet-friendly options, etc.

  - imati na mapi i te amenities (uzeti od gugla valjda) i onda da se moze stavit filter i udaljenost od x. Kada mijenjaš radius filtera se on nacrta kao krug na mapi oko svakog property-a. Može više od jednom.

- Heat maps: to je praktički ovo preklapanje svih korisnika. Samo napravit da se lijepo stackaju opacity-i i napravit da ima opcija da bude u različitim ili istim bojama

- Batch Editing
  - može se odabrati stupac i onda ili **SET** ili **APPLY FORMULA**
    - može biti 'plus', 'puta', 'nadodaj' (string).
  - važno: assign novom agentu ili vlasniku

## Kada postane official:

- Data Encryption: Protect sensitive client and property information.
- Audit Logs: Track changes and access for compliance purposes.
- GDPR Compliance Tools: Features to manage data consent and deletion requests.
