function matchAnalysis(human, pet) {
    switch(pet.age) {
        case 'Baby':
        case 'Young':
            if (human.age < 30)  {
                return `You're both young at heart. It's a match!`;
            } else {
                return `You might be too old for this pal.`;
            }
        case 'Adult':
            if (human.age >= 30 && human.age <= 38) {
                return `Middle aged crisis coming soon for the both of you. It's a match!`;
            } else if (human.age >= 36) {
                return `Best find a match your own age you ol' cougar you.`;
            } else {
                return `You'll fair better with a yungin' like yourself`;
            }
        case 'Senior':
            if (human.age > 38) {
                return `Your pal can probably stand your 90s pop collection. It's a match!`;
            } else {
                return `You might fair better with a younger pal.`;
            }
    }
}
