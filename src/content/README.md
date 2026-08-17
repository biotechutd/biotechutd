# Website Content YAML Reference

This folder contains public website content that can be edited through GitHub.

Do not add passwords, webhook URLs, API keys, or private information here (duh).

## Officers

Path: `officers/[category]/[officer-name].yaml`

Categories (for now): `executive`, `cs-engr`, `industry`, `philantropy`, `marketing`, `founders`

```yaml
name: Jane Doe              # Required: officer display name.
role: Jester                # Optional: officer title or role.
order: 1                    # Optional: display order; defaults to the end.
featured: true              # Optional: highlight in featured layouts; defaults to false.
major: Biology              # Optional: officer major.
year: Senior                # Optional: officer year.
image: /images/headshots/jane.jpg # Optional: image path; falls back if missing.
email: jane@example.com     # Optional: valid email address.
linkedin: https://linkedin.com/in/jane # Optional: valid LinkedIn URL.
github: https://github.com/jane # Optional: valid GitHub URL.
```

## Named Galleries

Path: `gallery/[gallery-name].yaml`

Images go in: `public/images/gallery/[gallery-name]/`

Current galleries: `home`, `minimissions`, `philantropy`

```yaml
autoAdvance: true           # Optional: automatically change slides; defaults to true.
images:                     # Optional: list of gallery images.
  - name: photo.jpg          # Required: filename inside this gallery folder.
    alt: Students at event.  # Required: accessible image description.
    title: Fall Kickoff      # Optional: caption shown under the slideshow.
```

If a gallery name is missing, invalid, or has no usable images, the site uses temporary fallback images.

## Homepage

Path: `home.yaml`

```yaml
hero:
  title: THE BIOTECH CLUB   # Required: main homepage title.
  summary: Short intro.     # Required: main homepage description.
  links:                    # Optional: hero buttons.
    - label: See Events     # Required per link: button text.
      href: /events         # Required per link: button URL.
newsletter:
  title: Biotech Newsletter # Required: embedded newsletter title.
  src: https://example.com  # Required: embedded newsletter URL.
programCards:               # Optional: homepage program cards.
  - title: Workshops        # Required: card title.
    body: Learn with us.    # Optional: card body; can be empty.
    cta:                    # Optional: card button.
      label: Learn More     # Required if cta is used: button text.
      href: /events         # Required if cta is used: button URL.
join:
  title: Join our Club      # Required: join section title.
  body: Applications open.  # Required: join section body.
```

## Committees

Path: `committees/[committee-name]/content.yaml`

Reference template: `committees/example-content.yaml`

```yaml
name: Projects              # Required: committee display name.
hero:
  eyebrow: Division          # Optional: small label; defaults to Division.
  title: Projects            # Required: hero title.
  summary: Short summary.    # Required: hero description.
  cta:                       # Optional: primary hero link.
    label: Get Involved      # Required if cta is used: link text.
    href: /contact           # Optional: link URL; button is hidden if blank.
  links:                     # Optional: extra hero links.
    - label: More Info       # Required per link: link text.
      href: /events          # Required per link: link URL.
  #Below only for Projects
  projectDescription:        # Optional: project description link.
    enabled: true            # Optional: whether to show it; defaults to false.
    label: Project Details   # Required if used: link text.
    href: https://example.com # Optional: link URL; blank becomes #.
  apply:                     # Optional: Projects page apply button.
    enabled: true            # Optional: whether to show it; defaults to false.
    label: Apply             # Optional: button text; defaults to Apply.
    href: /join              # Optional: button URL; blank becomes #.
#Only for Projects
projects:                   # Optional: project list.
  - companyName: Company     # Optional: company name.
    projectName: Project     # Optional: project name.
    description: Summary.    # Optional: project description.
```

## Applications

Path: `applications.yaml`

```yaml
cards:                       # Optional: cards shown on the join page.
  - enabled: true            # Optional: whether this card is visible; defaults to true.
    title: Projects          # Required: card title.
    description: Apply now.  # Required: card description.
    rotate: -0.5             # Optional: small visual tilt.
    actions:                 # Optional: card buttons.
      - visible: true        # Optional: whether this button is shown; defaults to true.
        label: Apply         # Required per action: button text.
        href: https://example.com # Required per action: button URL.
```

## Contact

Path: `contact.yaml`

```yaml
heading:
  eyebrow: Contact          # Optional: small page label; defaults to Contact.
  title: Send us a note!    # Optional: main page heading.
discord:
  enabled: true             # Optional: whether to show the Discord note.
  title: Join the Discord   # Required: Discord note title.
  body: Casual updates.     # Required: Discord note body.
  label: Join Discord       # Optional: button text; defaults to Join Discord.
  href: https://discord.gg/ # Required: Discord invite URL.
```

## Events

Path: `events.yaml`

```yaml
upcoming:                   # Required: list of upcoming events.
  - title: Semester Kickoff  # Required: event title.
    date: TBD               # Required: event date text.
    description: Meet us.   # Required: short event description.
```

## Links

Path: `links.yaml`

```yaml
socials:
  github: https://github.com/ # Required: GitHub URL.
  linkedin: https://linkedin.com/ # Required: LinkedIn URL.
  email: biotechutd@gmail.com # Required: club email.
  instagram: https://instagram.com/ # Optional: Instagram URL.
  discord: https://discord.com/ # Optional: Discord URL.
  linktree: https://linktr.ee/ # Optional: Linktree URL.
```

## Banner

Path: `banner.yaml`

```yaml
enabled: true               # Optional: whether to show the banner; defaults to false.
text: GBM this Friday       # Required: banner message.
href: /events               # Optional: banner link.
```
