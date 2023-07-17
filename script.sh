#!/bin/bash

# Récupérer les paramètres du script
read -p "Enter the date in YEAR-MONTH-DAY format (ex: 2023-07-07) : " backup_date
read -p "Enter the backup folder path : " backup_folder

# Fonction pour vérifier le format de la date
function validate_date_format() {
  local date_regex='^[0-9]{4}-[0-9]{2}-[0-9]{2}$'
  if [[ $1 =~ $date_regex ]]; then
    return 0
  else
    return 1
  fi
}

# Vérifier si les paramètres sont renseignés, sinon demander en interactif
if [[ -z "$backup_date" ]]; then
  read -p "Backup date (YEAR-MONTH-DAY) : " backup_date
fi

# Vérifier le format de la date
while ! validate_date_format "$backup_date"; do
  echo "Invalid date format. Please use the format YEAR-MONTH-DAY (ex: 2023-07-07)."
  read -p "Backup date (YEAR-MONTH-DAY) : " backup_date
done

if [[ -z "$backup_folder" ]]; then
  read -p "Backup folder path : " backup_folder
fi

# Vérifier si le dossier de sauvegarde existe, sinon le créer
if [[ ! -d "$backup_folder" ]]; then
  mkdir -p "$backup_folder"
fi

# Chemin du répertoire contenant les fichiers sources de l'application React
app_source_folder="web/"

# Chemin du répertoire de sauvegarde avec la date
backup_path="$backup_folder/backup_$backup_date"

# Vérifier si le dossier de sauvegarde avec la date existe, sinon le créer
if [[ ! -d "$backup_path" ]]; then
  mkdir -p "$backup_path"
fi

# Effectuer la sauvegarde en utilisant rsync pour copier les fichiers sources dans le dossier de sauvegarde
rsync -av "$app_source_folder/" "$backup_path"

# Vérifier si la sauvegarde a été effectuée avec succès
if [[ $? -eq 0 ]]; then
  echo "Backup completed successfully : $backup_path"
else
  echo "Error while saving."
fi
