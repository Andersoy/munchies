# Munchies

A Vue 3 + TypeScript case project based on a provided Figma design and external API.

## Run locally

```bash
npm install
npm run dev
```

Other useful commands:

```bash
npm run type-check
npm run build
npm run lint
```

## Tech stack

- Vue 3
- TypeScript
- Pinia
- Vue Router
- Vite
- Tailwind CSS

## Notes on implementation

This case included some ambiguity in both the Figma file and the API responses, so a few implementation decisions were made deliberately.

### API

API results were mapped to the corresponding types/objects.

As not all restaurant information was available in the main restaurant API response, new API calls had to be done to get the 
relevant filters. For price range, I use promise caching to avoid racing conditions and duplicated API calls as there were only 4 different price range categories.

### Error handling

If restaurant fetching fails, the app shows an error message with a retry button.  
If filter fetching fails, the restaurant list is still shown. Delivery time filter will still show as this does not 
come from the API. The other filters are not shown and an error message shows instead.

### Filtering behavior

The Figma design did not clearly define filtering rules, so filtering was implemented with a consistent pattern:

- Multiple selected options within the same filter group use `OR`
- Different filter groups combine with `AND`
- If no filters are selected, all restaurants are shown

### Active states

The Figma screens did not include explicit active states for filter controls.

To keep the UI consistent, active filters use a border with the green color as stated in the "Styles"-page in Figma and a stronger shadow.

### Closed restaurants

The design shows a message stating the opening time of the restaurant, but the API only provides whether a restaurant is open or closed.

Because opening-time details are not available from the API, closed restaurants use the message: `Currently closed`

### Mobile price range filter

The desktop design includes a price range filter, while the mobile screen does not. In case this is a mistake in the
design the mobile price-range filter code has been kept but left disabled.

## Loading screen

While waiting for the API to return restaurants and filters the restaurant list is showing empty restaurant cards with placeholders
pulsating.

### Fonts

The design specifies SF Pro, and includes a download link. This is an Apple-font and is not readily available for use on Windows or Linux without a license.
However, I have used it for this project and downloaded the available fonts from GitHub, but not all versions were available. Specifically the Expanded Bold so I used 
the closest alternative I could find from the SF Pro fonts I had available.

### Responsive design

The design did not include information for the screen sizes between mobile and desktop, so I made a few choices to keep the 
design responsive along the way.