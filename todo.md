# TODO

## Ostatak:

- file storage (documents)

- selected property basic

- editanje polygona
  - kad se stisne polygon se pokaže popup sa edit|delete gumbima

## MVP

- spremanje klijenata
- spremanje nekretnina
- filtriranje (matchanje)

## Glavni plan

1. riješiti dupliciranje nekretnina (data import from CVS i/ili API integracija)

## Low

- [ ] Editanje polygona (micanje rubova, tog tipa) -> za ovo već nešto postoji, vidjet možda ako je dovoljno "lean".
- [ ] Na hover polygona u listi polygona se promjeni boja odgovarajućeg polygona na mapi tako da se zna koji se hovera

- [ ] Može se save-at temporary nekretnina nakon šta se edita da postane "prava"

## Kasnije od kasnije

- [ ] Klik na `Nacrtaj` filter prebaci na `Map` tab ako nije već tamo

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
