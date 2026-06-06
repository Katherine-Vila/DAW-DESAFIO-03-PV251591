function audioEngine(audioElement) {
    this.audio = audioElement;
    this.currentObjectUrl = null;

    this.load = function(source) {
        if (this.currentObjectUrl) {
            URL.revokeObjectURL(this.currentObjectUrl);
            this.currentObjectUrl = null;
        }

        if (source instanceof File) {
            this.currentObjectUrl = URL.createObjectURL(source);
            this.audio.src = this.currentObjectUrl;
        } else {
            this.audio.src = source;
        }

        this.audio.load();
    };

    this.play = function() {
        return this.audio.play();
    };

    this.stop = function() {
        this.audio.pause();
        this.audio.currentTime = 0;
    };
}

$(document).ready(function() {
    const cancionLocal = {
        Cancion: 'Cumplea\u00f1os Feliz',
        Cantante: 'Parch\u00eds',
        Discografica: 'Discos Belter',
        Duracion: '3 minutos y 30 segundos',
        URL: 'assets/happy-birthday.mp3',
        Pais: 'Espa\u00f1a'
    };

    const cancionesSesion = [
        {
            Cancion: 'Bachata Street',
            Cantante: 'Artista invitado',
            Discografica: 'Demo Music',
            Duracion: '4:43',
            URL: 'assets/bachata-street.mp3',
            Pais: 'Rep\u00fablica Dominicana'
        },
        {
            Cancion: 'Bajo el Cielo Estrellado',
            Cantante: 'Orquesta cl\u00e1sica',
            Discografica: 'Demo Music',
            Duracion: '4:12',
            URL: 'assets/bajo-el-cielo-estrellado%20CLASICA.mp3',
            Pais: 'Espa\u00f1a'
        },
        {
            Cancion: 'Cumbia',
            Cantante: 'Grupo tropical',
            Discografica: 'Demo Music',
            Duracion: '3:36',
            URL: 'assets/cumbia.mp3',
            Pais: 'Colombia'
        },
        {
            Cancion: 'Christmas',
            Cantante: 'Coro navide\u00f1o',
            Discografica: 'Demo Music',
            Duracion: '2:40',
            URL: 'assets/christmas.mp3',
            Pais: 'Estados Unidos'
        },
        {
            Cancion: 'Coraz\u00f3n en Silencio',
            Cantante: 'Voz ranchera',
            Discografica: 'Demo Music',
            Duracion: '5:24',
            URL: 'assets/corazon-en-silencio%20RANCHERAS.mp3',
            Pais: 'M\u00e9xico'
        },
        {
            Cancion: 'Dance Pop',
            Cantante: 'DJ Demo',
            Discografica: 'Demo Music',
            Duracion: '4:30',
            URL: 'assets/dance-pop.mp3',
            Pais: 'Estados Unidos'
        },
        {
            Cancion: 'Jazz Music',
            Cantante: 'Jazz Band',
            Discografica: 'Demo Music',
            Duracion: '3:07',
            URL: 'assets/jazz-music.mp3',
            Pais: 'Estados Unidos'
        },
        {
            Cancion: 'Piano',
            Cantante: 'Pianista invitado',
            Discografica: 'Demo Music',
            Duracion: '2:14',
            URL: 'assets/piano.mp3',
            Pais: 'Francia'
        },
        {
            Cancion: 'Sad Cl\u00e1sico Dram\u00e1tico',
            Cantante: 'Orquesta instrumental',
            Discografica: 'Demo Music',
            Duracion: '3:15',
            URL: 'assets/Sad%20Clasico%20Dramatico.mp3',
            Pais: 'Italia'
        }
    ];

    const cancionJSON = JSON.stringify(cancionLocal);
    localStorage.setItem('miCancion', cancionJSON);
    sessionStorage.setItem('listaMusical', JSON.stringify(cancionesSesion));

    const storedCancionJSON = localStorage.getItem('miCancion');
    const storedCancion = JSON.parse(storedCancionJSON);

    console.log('localStorage - miCancion');
    console.log(storedCancion);
    console.log('sessionStorage - listaMusical');
    console.log(JSON.parse(sessionStorage.getItem('listaMusical')));

    const audio = document.getElementById('audioPlayer');
    const engine = new audioEngine(audio);
    let playlist = [Object.assign({ File: null }, storedCancion)];
    let currentIndex = 0;
    let isPlaying = false;

    renderPlaylist();
    loadSong(0, false);

    $('#songForm').on('submit', function(event) {
        event.preventDefault();

        const fileInput = document.getElementById('audioFile');
        const selectedFile = fileInput.files[0];
        const song = {
            Cancion: $('#songName').val().trim(),
            Cantante: $('#singer').val().trim(),
            Discografica: $('#label').val().trim(),
            Duracion: $('#duration').val().trim(),
            Pais: $('#country').val().trim(),
            URL: selectedFile.name,
            File: selectedFile
        };

        playlist.push(song);
        saveSessionSongs();
        renderPlaylist();
        loadSong(playlist.length - 1, true);
        this.reset();

        console.log('sessionStorage - listaMusical');
        console.log(JSON.parse(sessionStorage.getItem('listaMusical')));
    });

    $('#audioFile').on('change', function() {
        if (this.files[0]) {
            $('#playerMessage').text('Archivo listo para guardar y reproducir.');
        }
    });

    audio.addEventListener('error', function() {
        $('#playerMessage').text('No se pudo cargar el audio. Revisa que el archivo exista en assets.');
    });

    audio.addEventListener('play', function() {
        isPlaying = true;
        updateActionButtons();
    });

    audio.addEventListener('pause', function() {
        isPlaying = false;
        updateActionButtons();
    });

    audio.addEventListener('ended', function() {
        isPlaying = false;
        updateActionButtons();
    });

    function renderPlaylist() {
        if (!playlist.length) {
            $('#playlistBody').html('<tr><td data-label="Lista" colspan="5">No hay canciones en la lista.</td></tr>');
            return;
        }

        const rows = playlist.map(function(song, index) {
            const selectedClass = index === currentIndex ? ' class="selected-song"' : '';
            const actionIcon = index === currentIndex && isPlaying ? '&#10074;&#10074;' : '&#9658;';
            const actionTitle = index === currentIndex && isPlaying ? 'Pausar' : 'Reproducir';

            return '<tr' + selectedClass + '>' +
                '<td data-label="#">' + (index + 1) + '</td>' +
                '<td data-label="Canci\u00f3n">' + escapeHtml(song.Cancion) + '<span>' + escapeHtml(song.Discografica) + '</span></td>' +
                '<td data-label="Cantante">' + escapeHtml(song.Cantante) + '</td>' +
                '<td data-label="Duraci\u00f3n">' + escapeHtml(song.Duracion) + '</td>' +
                '<td data-label="Acciones"><div class="actions">' +
                '<button type="button" class="icon-button play-action" data-index="' + index + '" title="' + actionTitle + '">' + actionIcon + '</button>' +
                '<button type="button" class="icon-button delete-action" data-index="' + index + '" title="Eliminar">&#128465;</button>' +
                '</div></td>' +
                '</tr>';
        }).join('');

        $('#playlistBody').html(rows);

        $('.play-action').on('click', function() {
            const index = parseInt(this.getAttribute('data-index'), 10);

            if (index === currentIndex && isPlaying) {
                audio.pause();
                return;
            }

            loadSong(index, true);
        });

        $('.delete-action').on('click', function() {
            const index = parseInt(this.getAttribute('data-index'), 10);
            playlist.splice(index, 1);
            saveSessionSongs();
            renderPlaylist();
            engine.stop();

            if (playlist.length) {
                loadSong(0, false);
            } else {
                currentIndex = 0;
                isPlaying = false;
                audio.removeAttribute('src');
                audio.load();
                $('#currentSong').text('Sin canci\u00f3n seleccionada');
                $('#playerMessage').text('La lista qued\u00f3 vac\u00eda.');
            }
        });
    }

    function loadSong(index, autoPlay) {
        const song = playlist[index];

        if (!song) {
            return;
        }

        currentIndex = index;
        $('#currentSong').text(song.Cancion + ' - ' + song.Cantante);
        $('#playerMessage').text('');
        engine.load(song.File || song.URL);
        updateActionButtons();

        if (autoPlay) {
            const playPromise = engine.play();
            if (playPromise) {
                playPromise.catch(function() {
                    $('#playerMessage').text('Presiona Play en el reproductor si el navegador bloquea la reproducci\u00f3n.');
                });
            }
        }
    }

    function updateActionButtons() {
        $('.play-action').each(function() {
            const index = parseInt(this.getAttribute('data-index'), 10);
            const isCurrent = index === currentIndex;
            this.innerHTML = isCurrent && isPlaying ? '&#10074;&#10074;' : '&#9658;';
            this.title = isCurrent && isPlaying ? 'Pausar' : 'Reproducir';
        });

        $('#playlistBody tr').each(function(index) {
            if (index === currentIndex) {
                this.classList.add('selected-song');
            } else {
                this.classList.remove('selected-song');
            }
        });
    }

    function saveSessionSongs() {
        const sessionSongs = playlist.slice(1).map(function(song) {
            return {
                Cancion: song.Cancion,
                Cantante: song.Cantante,
                Discografica: song.Discografica,
                Duracion: song.Duracion,
                URL: song.File ? song.File.name : song.URL,
                Pais: song.Pais
            };
        });

        sessionStorage.setItem('listaMusical', JSON.stringify(sessionSongs));
    }

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
});
