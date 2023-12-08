import { createDocument } from "./fs.mjs";
import { program } from "commander";

program
  .option("--filepath <valeur>", "Spécifiez le fichier à convertir")
  .option("--fileout <valeur>", "Spécifiez le fichier de sortie (optionnel)")
  .parse(process.argv);

const options = program.opts();

if (options.filepath) {
  createDocument(options.filepath, options.fileout);
} else {
  console.error(
    "Le paramètre filepath est obligatoire. Utilisez --filepath pour spécifier le fichier à convertir."
  );
}
