# NRH Loading Screen

Loading screen HTML/CSS/JS pret pour GitHub Pages.

## Fichiers

- `index.html`
- `style.css`
- `script.js`
- `assets/`

## Installation GitHub Pages

1. Cree un repository GitHub public.
2. Envoie tout le contenu du dossier `LOADINGSCREEN`.
3. Va dans `Settings > Pages`.
4. Choisis `Deploy from a branch`, branche `main`, dossier `/root`.
5. Mets l'URL donnee par GitHub dans ton `server.cfg`.

```cfg
sv_loadingurl "https://TON-PSEUDO.github.io/NOM-DU-REPO/?map=%m&steamid=%s"
```

Si tu utilises un sous-dossier dans ton repo, ajoute le nom du dossier dans l'URL.

## Notes

Le script gere les callbacks Garry's Mod:

- `GameDetails`
- `SetStatusChanged`
- `SetFilesTotal`
- `SetFilesNeeded`
- `DownloadingFile`

Si tu ouvres `index.html` dans un navigateur normal, un mode preview simule le chargement.
