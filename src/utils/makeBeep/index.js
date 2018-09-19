const makeBeep = () => {
    const context = new AudioContext();
    const o = context.createOscillator();
    const  g = context.createGain();
    o.type = "triangle";
    o.frequency.value = 440;
    o.connect(g);
    g.connect(context.destination);
    o.start(0);
    o.stop(1);
};

export default makeBeep;