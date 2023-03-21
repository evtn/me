type IconProps = { className?: string };

export const TGIcon = (props: IconProps) => {
  return (
    <svg viewBox="0 0 1000 1000" className={props.className}>
      <path
        d="M68.745 442.397C337.179 325.445 516.179 248.343 605.74 211.091 861.461 104.727 914.594 86.252 949.228 85.643c7.618-.135 24.65 1.753 35.681 10.706 9.316 7.557 11.878 17.77 13.107 24.935 1.227 7.168 2.753 23.493 1.54 36.25-13.859 145.6-73.82 498.938-104.325 662.013-12.907 69.006-38.323 92.143-62.928 94.406-53.473 4.92-94.078-35.34-145.87-69.289-81.043-53.125-126.827-86.196-205.493-138.035-90.913-59.91-31.978-92.838 19.834-146.65 13.556-14.087 249.16-228.385 253.72-247.826.57-2.43 1.098-11.491-4.284-16.278-5.385-4.785-13.331-3.15-19.066-1.847-8.128 1.845-137.595 87.417-388.402 256.722-36.749 25.233-70.036 37.528-99.857 36.883-32.878-.711-96.122-18.59-143.137-33.873C42.082 535.016-3.75 525.104.243 493.27c2.077-16.58 24.91-33.537 68.5-50.873Z"
        fill="currentColor"
      />
    </svg>
  );
};
