# StreamElements Alert Fixes

## Issues Found

1. Missing `bag.png`
- The tip alert references `bag.png` but the file is missing from the repo.
- Result: browser console 404 errors and broken/missing tip animation assets.

2. GitHub Pages confusion
- The repo does not include an `index.html`.
- Visiting the GitHub Pages root directly can show a 404 even though assets are still being served correctly.

3. `imageBase` field misconfiguration
- All five `fields.json` files defaulted to an empty URL.
- The label also implied users needed to manually enter `/assets`.
- If users typed the wrong path, StreamElements generated invalid image URLs.

## Fixes Applied

- Pre-filled the correct GitHub Pages URL:
  https://tschmitty67.github.io/schmitty-alert/

- Updated all 5 alert widgets:
  - follow
  - sub
  - bits
  - raid
  - tip

- Simplified the field label so users do not accidentally overwrite the asset path.

## Remaining Manual Fix

You still need to upload/add:
- `bag.png`

Place it in the same GitHub Pages asset directory expected by the tip alert.

## StreamElements Debug Tip

Open the overlay in browser source mode and check:
F12 -> Console -> Network

Look for:
- 404 errors
- blocked assets
- malformed GitHub Pages URLs

If the alerts still fail:
- Re-save the widget in StreamElements
- Hard refresh cache (Ctrl+Shift+R)
- Verify GitHub Pages is deployed from the correct branch
