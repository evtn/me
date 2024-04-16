const story = [
    'The user mindlessly clicked a quirky logo on a cluttered personal website during their lunch break. To their shock, instead of an "About" page, they landed on a short story that accurately described their actions in the present moment.',
    "As they read on, equally amazed and disturbed, the narrative anticipated their every thought and reaction. It was as if the words morphed fluidly to match their experience of reading about themselves reading this metaphysically recursive tale.",
    "By the end, thoroughly unsettled, the user closed the browser and walked away, blissfully unaware that this was just another layer in an infinite regress of stories within stories.",
];

export const Story = () => {
    return (
        <div className="story">
            {story.map((x, i) => (
                <p key={i}>{x}</p>
            ))}
        </div>
    );
};
