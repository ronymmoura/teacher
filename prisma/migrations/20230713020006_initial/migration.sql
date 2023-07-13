-- CreateEnum
CREATE TYPE "WordType" AS ENUM ('Noun', 'Pronoun', 'Verb', 'Adjective', 'Adverb', 'Preposition', 'Conjunction', 'Interjection', 'Numeral', 'Article', 'Determiner');

-- CreateTable
CREATE TABLE "Sentence" (
    "id" TEXT NOT NULL,
    "sentence" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sentence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Word" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "type" "WordType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sentenceId" TEXT,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_sentenceId_fkey" FOREIGN KEY ("sentenceId") REFERENCES "Sentence"("id") ON DELETE SET NULL ON UPDATE CASCADE;
