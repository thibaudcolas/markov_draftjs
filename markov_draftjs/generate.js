const fs = require('fs');
const path = require('path');
const Text = require('markov-chains-text').default;
const randomColor = require('randomcolor');

const karamazov = fs.readFileSync(
    path.join(__dirname, 'corpora', 'karamazov.txt'),
    'utf8',
);

const fakeKaramazov = new Text(karamazov);

const makeRange = (size = Math.ceil(Math.random() * 10) + 3) => {
    const range = [];

    for (let i = 0; i < size; i++) {
        range.push(i);
    }

    return range;
};

const makeDigits = nbDigits =>
    Math.random()
        .toFixed(nbDigits)
        .split('.')[1];
const makeId = makeDigits.bind(null, 2);

const makeText = minLength => {
    let text = fakeKaramazov.makeSentence(minLength * 2);

    while (text.length < minLength) {
        text += ` ${fakeKaramazov.makeSentence(minLength * 2)}`;
    }

    return text;
};

const makeImageSource = () => {
    const bgColor = randomColor().replace('#', '');
    const textColor = randomColor().replace('#', '');
    const text = makeId();
    return `http://via.placeholder.com/350x99/${bgColor}/${textColor}?text=${
        text
    }`;
};

const getStats = contentStates => {
    const length = contentStates.length;

    const entitiesCount = contentStates.reduce((sum, f) => {
        return sum + f.blocks.reduce((s, b) => s + b.entityRanges.length, 0);
    }, 0);

    const stylesCount = contentStates.reduce((sum, f) => {
        return (
            sum + f.blocks.reduce((s, b) => s + b.inlineStyleRanges.length, 0)
        );
    }, 0);

    const blockKeys = contentStates.reduce((keys, f) => {
        return keys.concat([f.blocks[0].key]);
    }, []);

    const uniqueBlockTypes = contentStates
        .reduce((types, f) => {
            const newTypes = f.blocks
                .map(b => b.type)
                .filter(
                    (t, i, all) =>
                        types.indexOf(t) === -1 && all.indexOf(t) === i,
                );

            return types.concat(newTypes);
        }, [])
        .sort();

    const uniqueInlineStyles = contentStates
        .reduce((styles, f) => {
            const newStyles = [];

            f.blocks.forEach(b => {
                b.inlineStyleRanges.forEach(s => {
                    if (
                        newStyles.indexOf(s.style) === -1 &&
                        styles.indexOf(s.style) === -1
                    ) {
                        newStyles.push(s.style);
                    }
                });
            });

            return styles.concat(newStyles);
        }, [])
        .sort();

    const uniqueEntityTypes = contentStates
        .reduce((types, f) => {
            const newTypes = Object.keys(f.entityMap)
                .map(e => f.entityMap[e].type)
                .filter(
                    (t, i, all) =>
                        types.indexOf(t) === -1 && all.indexOf(t) === i,
                );

            return types.concat(newTypes);
        }, [])
        .sort();

    return {
        length,
        entitiesCount,
        stylesCount,
        blockKeys,
        uniqueBlockTypes,
        uniqueInlineStyles,
        uniqueEntityTypes,
    };
};

const makeBlock = i => {
    return {
        data: {},
        entityRanges: [],
        text: '',
        inlineStyleRanges: [],
        key: `${i}${makeDigits(3)}${i}`,
        type: 'unstyled',
        depth: 0,
    };
};

const newFixtures = makeRange(10)
    .map(i => ({
        entityMap: {},
        blocks: makeRange().map(makeBlock.bind(null, i)),
    }))
    .map(f => {
        const entityMap = Object.keys(f.entityMap).reduce((map, key) => {
            const entity = f.entityMap[key];
            map[key] = Object.assign({}, entity);

            return map;
        }, {});

        const blocks = f.blocks.map(b => {
            const inlineStyleRanges = b.inlineStyleRanges.slice();
            const entityRanges = b.entityRanges.filter(e => !!entityMap[e.key]);

            // const longestStyleRef = inlineStyleRanges.reduce(
            //     (longest, range) => {
            //         const end = range.offset + range.length;
            //         return Math.max(end, longest);
            //     },
            //     0,
            // );

            // const longestEntityRef = entityRanges.reduce((longest, range) => {
            //     const end = range.offset + range.length;
            //     return Math.max(end, longest);
            // }, 0);

            // const longestRef = Math.max(longestStyleRef, longestEntityRef);

            // let textLengthTarget;

            // if (longestRef === 0) {
            //     textLengthTarget = 70;
            // } else {
            //     textLengthTarget = Math.ceil(longestRef * 1.2);
            // }

            return Object.assign({}, b, {
                text: makeText(100),
                // text: makeText(textLengthTarget),
                inlineStyleRanges,
                entityRanges,
            });
        });

        return {
            entityMap: entityMap,
            blocks: blocks,
        };
    });

const fixtureStats = getStats(newFixtures);
console.dir(fixtureStats);

fs.writeFile('generate.json', JSON.stringify(newFixtures, null, 2), err => {
    if (err) console.log(err);
});
