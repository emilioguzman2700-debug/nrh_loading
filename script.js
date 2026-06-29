(function () {
    var state = {
        totalFiles: 0,
        neededFiles: 0,
        progress: 0,
        demoTimer: null
    };

    var els = {
        serverName: document.getElementById("serverName"),
        mapName: document.getElementById("mapName"),
        gameMode: document.getElementById("gameMode"),
        statusText: document.getElementById("statusText"),
        fileText: document.getElementById("fileText"),
        progressLabel: document.getElementById("progressLabel"),
        progressPercent: document.getElementById("progressPercent"),
        progressFill: document.getElementById("progressFill")
    };

    function cleanText(value, fallback) {
        value = String(value || "").replace(/[<>]/g, "").trim();
        return value.length > 0 ? value : fallback;
    }

    function setProgress(value) {
        var progress = Math.max(0, Math.min(100, Math.round(value || 0)));
        state.progress = progress;
        els.progressFill.style.width = progress + "%";
        els.progressPercent.textContent = progress + "%";

        if (progress >= 100) {
            els.progressLabel.textContent = "Chargement termine";
            els.statusText.textContent = "Entree dans le monde...";
        }
    }

    function setStatus(text) {
        els.statusText.textContent = cleanText(text, "Chargement en cours...");
    }

    function setFile(text) {
        els.fileText.textContent = cleanText(text, "Synchronisation avec le serveur...");
    }

    function updateFromFileCount() {
        if (state.totalFiles <= 0) return;
        var done = state.totalFiles - state.neededFiles;
        setProgress((done / state.totalFiles) * 100);
    }

    window.GameDetails = function (serverName, serverUrl, mapName, maxPlayers, steamId, gameMode) {
        els.serverName.textContent = cleanText(serverName, "NRH");
        els.mapName.textContent = cleanText(mapName, "Chargement");
        els.gameMode.textContent = cleanText(gameMode, "Demon Slayer RP");
        setStatus("Connexion au serveur...");
    };

    window.SetStatusChanged = function (status) {
        setStatus(status);
    };

    window.SetFilesTotal = function (total) {
        state.totalFiles = Math.max(0, Number(total) || 0);
        state.neededFiles = state.totalFiles;
        updateFromFileCount();
    };

    window.SetFilesNeeded = function (needed) {
        state.neededFiles = Math.max(0, Number(needed) || 0);
        updateFromFileCount();
    };

    window.DownloadingFile = function (fileName) {
        setFile("Telechargement : " + cleanText(fileName, "contenu serveur"));
        if (state.totalFiles <= 0) {
            setProgress(Math.min(96, state.progress + 2));
        }
    };

    function hydrateFromQuery() {
        var params = new URLSearchParams(window.location.search);
        if (params.get("map")) els.mapName.textContent = cleanText(params.get("map"), "Chargement");
        if (params.get("servername")) els.serverName.textContent = cleanText(params.get("servername"), "NRH");
        if (params.get("gamemode")) els.gameMode.textContent = cleanText(params.get("gamemode"), "Demon Slayer RP");
    }

    function startPreviewMode() {
        if (navigator.userAgent.toLowerCase().indexOf("valve source client") !== -1) return;

        var previewFiles = [
            "models/yufu/oldjimmy/demonslayer/custom/water_slayer_male1.mdl",
            "materials/kojin_v2/logo_solo.png",
            "particles/nrh_breathing_styles.pcf",
            "sound/nrh/interface/click.wav"
        ];
        var index = 0;
        setStatus("Mode preview navigateur");

        state.demoTimer = window.setInterval(function () {
            index += 1;
            setProgress(Math.min(100, state.progress + Math.ceil(Math.random() * 8)));
            setFile("Preview : " + previewFiles[index % previewFiles.length]);

            if (state.progress >= 100) {
                window.clearInterval(state.demoTimer);
                setFile("Preview terminee. Heberge ce dossier puis configure sv_loadingurl.");
            }
        }, 750);
    }

    hydrateFromQuery();
    setProgress(0);
    window.setTimeout(startPreviewMode, 500);
}());
