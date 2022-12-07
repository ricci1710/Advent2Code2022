import {MOCK_DATA_DAY_07} from "./data07";
import {MOCK_DEMO_DATA_DAY_07} from "./demo07";

/**
 * --- Day 7: No Space Left On Device ---
 * You can hear birds chirping and raindrops hitting leaves as the expedition proceeds. Occasionally, you can even hear much louder sounds in the distance; how big do the animals get out here, anyway?
 *
 * The device the Elves gave you has problems with more than just its communication system. You try to run a system update:
 *
 * $ system-update --please --pretty-please-with-sugar-on-top
 * Error: No space left on device
 * Perhaps you can delete some files to make space for the update?
 *
 * You browse around the filesystem to assess the situation and save the resulting terminal output (your puzzle input). For example:
 *
 * $ cd /
 * $ ls
 * dir a
 * 14848514 b.txt
 * 8504156 c.dat
 * dir d
 * $ cd a
 * $ ls
 * dir e
 * 29116 f
 * 2557 g
 * 62596 h.lst
 * $ cd e
 * $ ls
 * 584 i
 * $ cd ..
 * $ cd ..
 * $ cd d
 * $ ls
 * 4060174 j
 * 8033020 d.log
 * 5626152 d.ext
 * 7214296 k
 * The filesystem consists of a tree of files (plain data) and directories (which can contain other directories or files). The outermost directory is called /. You can navigate around the filesystem, moving into or out of directories and listing the contents of the directory you're currently in.
 *
 * Within the terminal output, lines that begin with $ are commands you executed, very much like some modern computers:
 *
 * cd means change directory. This changes which directory is the current directory, but the specific result depends on the argument:
 * cd x moves in one level: it looks in the current directory for the directory named x and makes it the current directory.
 * cd .. moves out one level: it finds the directory that contains the current directory, then makes that directory the current directory.
 * cd / switches the current directory to the outermost directory, /.
 * ls means list. It prints out all of the files and directories immediately contained by the current directory:
 * 123 abc means that the current directory contains a file named abc with size 123.
 * dir xyz means that the current directory contains a directory named xyz.
 * Given the commands and output in the example above, you can determine that the filesystem looks visually like this:
 *
 * - / (dir)
 *   - a (dir)
 *     - e (dir)
 *       - i (file, size=584)
 *     - f (file, size=29116)
 *     - g (file, size=2557)
 *     - h.lst (file, size=62596)
 *   - b.txt (file, size=14848514)
 *   - c.dat (file, size=8504156)
 *   - d (dir)
 *     - j (file, size=4060174)
 *     - d.log (file, size=8033020)
 *     - d.ext (file, size=5626152)
 *     - k (file, size=7214296)
 * Here, there are four directories: / (the outermost directory), a and d (which are in /), and e (which is in a). These directories also contain files of various sizes.
 *
 * Since the disk is full, your first step should probably be to find directories that are good candidates for deletion. To do this, you need to determine the total size of each directory. The total size of a directory is the sum of the sizes of the files it contains, directly or indirectly. (Directories themselves do not count as having any intrinsic size.)
 *
 * The total sizes of the directories above can be found as follows:
 *
 * The total size of directory e is 584 because it contains a single file i of size 584 and no other directories.
 * The directory a has total size 94853 because it contains files f (size 29116), g (size 2557), and h.lst (size 62596), plus file i indirectly (a contains e which contains i).
 * Directory d has total size 24933642.
 * As the outermost directory, / contains every file. Its total size is 48381165, the sum of the size of every file.
 * To begin, find all of the directories with a total size of at most 100000, then calculate the sum of their total sizes. In the example above, these directories are a and e; the sum of their total sizes is 95437 (94853 + 584). (As in this example, this process can count files more than once!)
 *
 * Find all of the directories with a total size of at most 100000. What is the sum of the total sizes of those directories?
 */
const Logic07 = () => {
  // region prepare mock data
  const data = MOCK_DATA_DAY_07.split('\n');
  const demoData = MOCK_DEMO_DATA_DAY_07.split('\n');

  const runCdCommand = (dirName, path) => {
    if (dirName === '..')
      path.pop();
    else
      path.push(dirName);
  };

  /**
   * Gibt den Zeiger des aktellen Pfades zurueck.
   * @param path
   * @param tree
   * @returns {*}
   */
  const getLevel = (path, tree) => {
    if (Object.keys(tree).length === 0) {
      const key = path[0];
      tree[key] = {};
      return tree[key];
    }

    let level = tree[path[0]]; // init root
    for (let pathIdx = 1; pathIdx < path.length; pathIdx += 1) {
      level = level[path[pathIdx]];
    }
    return level;
  };

  const buildObject = (values) => {
    const tree = {};
    const path = [];

    let level;
    values.forEach((item) => {
      if (item.indexOf('$ cd') >= 0) {
        const splitCmd = item.split(' ');
        const dirName = splitCmd[2];
        runCdCommand(dirName, path);
      } else if (item.indexOf('$ ls') >= 0) {
        level = getLevel(path, tree);
      } else {
        const itemParts = item.split(' ');
        if (itemParts[0] === 'dir')
          level[itemParts[1]] = {};
        else
          level[itemParts[1]] = parseInt(itemParts[0], 10);
      }
    });

    return tree;
  };

  const demoTreeData = buildObject(demoData);
  const lifeTreeData = buildObject(data);

  // endregion prepare mock data
  // region score rules
  // endregion score rules
  // region score calculation
  /**
   * Find all the directories with a total size of at most 100000.
   * What is the sum of the total sizes of those directories
   * @param treeData
   * @returns {*}
   */
  const calcPartOne = (treeData) => {
    const totalSizeMap = new Map();
    calc(treeData, totalSizeMap);
    console.log(totalSizeMap);
    let atMost100k = 0;
    for (const [key, value] of totalSizeMap) {
      if (value <= 100000)
        atMost100k += value;
    }
    return {outermostDirectory: totalSizeMap.get('/'), atMost100k};
  };

  const calc = (treeData, totalSizeMap, dirKey) => {
    const keys = Object.keys(treeData);
    for (let idx = 0; idx < keys.length; idx += 1) {
      const key = keys[idx];
      const item = treeData[key];
      if (typeof item === 'object') {
        totalSizeMap.set(key, 0);
        calc(item, totalSizeMap, key);
        const totalSizeFromSub = totalSizeMap.get(key);
        const totalSize = totalSizeMap.get(dirKey);
        if (dirKey !== undefined)
          totalSizeMap.set(dirKey, totalSize + totalSizeFromSub);
      } else {
        const totalSize = totalSizeMap.get(dirKey);
        totalSizeMap.set(dirKey, totalSize + item);
      }
    }
  };


  // endregion score calculation
  // region print out part one
  const {outermostDirectory: demoOutermostDirectory, atMost100k: demoAtMost100k} = calcPartOne(demoTreeData);
  console.assert(demoOutermostDirectory === 48381165, `Algorithm is incorrect - expected: '48381165 calculated value: ${demoOutermostDirectory}`);
  console.assert(demoAtMost100k === 95437, `Algorithm is incorrect - expected: '95437 calculated value: ${demoAtMost100k}`);
  console.log('Demo-Score (Part One)  -> 95437 ===', demoAtMost100k);

  const {atMost100k: scoreAtMost100k} = calcPartOne(lifeTreeData);
  console.log('Score (Part One)  -> ??? (424) ===', scoreAtMost100k);
  // endregion print out part one
  // region print out part two
  // endregion print out part two
};

export default Logic07;
