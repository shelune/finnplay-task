import classNames from "classnames";
import React, { FC, useCallback, useMemo, useState } from "react";

import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as HamburgerIcon } from "../../assets/icons/hamburger.svg";
import css from "./games.module.scss";
import { LocalGame, LocalGameGroup, LocalProvider } from "../../utils/types";

type Props = {
  games: LocalGame[];
  providers: LocalProvider[];
  groups: LocalGameGroup[];
};

type SortingType = "A-Z" | "Z-A" | "Newest";

const COLUMN_OPTIONS = [2, 3, 4];

export const GamesView: FC<Props> = ({ games, providers, groups }) => {
  const [search, setSearch] = useState("");
  const [activeProviders, setActiveProviders] = useState<number[]>([]);
  const [activeGroups, setActiveGroups] = useState<number[]>([]);
  const [sorting, setSorting] = useState<SortingType>("A-Z");
  const [columnCount, setColumnCount] = useState(4);
  const [showFilters, setShowFilters] = useState(false);

  const filteredGames = useMemo(() => {
    const filtered = games
      .filter((game) => {
        if (search) {
          return game.name.toLowerCase().includes(search.toLowerCase());
        }
        return game;
      })
      .filter(
        (game) =>
          activeProviders.includes(game.provider) ||
          activeProviders.length === 0,
      )
      .filter((game) => {
        if (activeGroups.length === 0) {
          return true;
        }
        const activeGroupsFull = groups.filter((group) =>
          activeGroups.includes(group.id),
        );
        const gamesIdInActiveGroups = activeGroupsFull.reduce((accu, curr) => {
          const { games: gamesOfGroup } = curr;
          return [...accu, ...gamesOfGroup];
        }, [] as number[]);
        return gamesIdInActiveGroups.includes(game.id);
      });

    const filteredSort = filtered.sort((a, b) => {
      if (sorting === "A-Z") {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      }
      if (sorting === "Z-A") {
        return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
      }
      if (sorting === "Newest") {
        return b.date.getTime() - a.date.getTime();
      }
      return 0;
    });
    return filteredSort;
  }, [activeGroups, activeProviders, games, groups, search, sorting]);

  const resetFilters = useCallback(() => {
    setSearch("");
    setActiveProviders([]);
    setActiveGroups([]);
    setSorting("A-Z");
    setColumnCount(4);
  }, []);

  return (
    <div className={css.gamesPage}>
      <div className={css.content}>
        <div
          className={classNames(css.gameFiltersMobile, {
            [css.isShowingFilters]: showFilters,
          })}
        >
          <div className={css.filterBySearch}>
            <div className={css.searchBar}>
              <input
                type="text"
                className={css.textInput}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
              />
              <SearchIcon className={css.searchIcon} />
            </div>
          </div>
          {showFilters && (
            <>
              <div className={css.filterByProviders}>
                <div className={css.filterTitle}>Providers</div>
                <div className={css.filterList}>
                  {providers.map((provider) => (
                    <span
                      key={provider.id}
                      className={classNames(css.filterPill, {
                        [css.isActive]: activeProviders.includes(provider.id),
                      })}
                      role="button"
                      tabIndex={0}
                      onKeyDown={() => {}}
                      onClick={() => {
                        if (activeProviders.includes(provider.id)) {
                          setActiveProviders(
                            activeProviders.filter(
                              (item) => item !== provider.id,
                            ),
                          );
                        } else {
                          setActiveProviders([...activeProviders, provider.id]);
                        }
                      }}
                    >
                      {provider.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className={css.filterByGroups}>
                <div className={css.filterTitle}>Game groups</div>
                <div className={css.filterList}>
                  {groups.map((group) => (
                    <span
                      key={group.id}
                      className={classNames(css.filterPill, {
                        [css.isActive]: activeGroups.includes(group.id),
                      })}
                      role="button"
                      tabIndex={0}
                      onKeyDown={() => {}}
                      onClick={() => {
                        if (activeGroups.includes(group.id)) {
                          setActiveGroups(
                            activeGroups.filter((item) => item !== group.id),
                          );
                        } else {
                          setActiveGroups([...activeGroups, group.id]);
                        }
                      }}
                    >
                      {group.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className={css.sorting}>
                <div className={css.filterTitle}>Sorting</div>
                <div className={css.filterList}>
                  {["A-Z", "Z-A", "Newest"].map((item) => (
                    <span
                      key={item}
                      className={classNames(css.filterPill, {
                        [css.isActive]: sorting === item,
                      })}
                      role="button"
                      tabIndex={0}
                      onKeyDown={() => {}}
                      onClick={() => {
                        if (sorting !== item) {
                          setSorting(item as SortingType);
                        }
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className={css.byline}>
                <div className={css.gamesCount}>
                  Game amount:
                  <span>{` ${filteredGames.length}`}</span>
                </div>
                <button
                  type="button"
                  className={css.resetFilters}
                  onClick={() => {
                    resetFilters();
                  }}
                >
                  Reset
                </button>
              </div>
            </>
          )}
          <div
            className={css.toggleFilters}
            role="button"
            tabIndex={0}
            onKeyDown={() => {}}
            onClick={() => setShowFilters(!showFilters)}
          >
            <HamburgerIcon className={css.toggleFiltersIcon} />
            <span>{showFilters ? "Hide filters" : "Show filters"}</span>
          </div>
        </div>
        {filteredGames.length ? (
          <div
            data-testid="game-list"
            className={classNames(css.gameList)}
            style={{
              gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
            }}
          >
            {filteredGames.map((item) => (
              <div
                data-testid="game-box"
                key={item.id}
                title={item.name}
                className={css.gameBox}
                style={{
                  backgroundImage: `url(${item.cover})`,
                }}
              />
            ))}
          </div>
        ) : (
          <div className={css.gameList}>Sorry, no matching game found.</div>
        )}
        <div className={css.gameFilters}>
          <div className={css.filterBySearch}>
            <div className={css.searchBar}>
              <input
                data-testid="game-search-text"
                type="text"
                className={css.textInput}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
              />
              <SearchIcon className={css.searchIcon} />
            </div>
          </div>
          <div className={css.filterByProviders}>
            <div className={css.filterTitle}>Providers</div>
            <div className={css.filterList}>
              {providers.map((provider) => (
                <span
                  key={provider.id}
                  className={classNames(css.filterPill, {
                    [css.isActive]: activeProviders.includes(provider.id),
                  })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => {}}
                  onClick={() => {
                    if (activeProviders.includes(provider.id)) {
                      setActiveProviders(
                        activeProviders.filter((item) => item !== provider.id),
                      );
                    } else {
                      setActiveProviders([...activeProviders, provider.id]);
                    }
                  }}
                >
                  {provider.name}
                </span>
              ))}
            </div>
          </div>
          <div className={css.filterByGroups}>
            <div className={css.filterTitle}>Game groups</div>
            <div className={css.filterList}>
              {groups.map((group) => (
                <span
                  key={group.id}
                  className={classNames(css.filterPill, {
                    [css.isActive]: activeGroups.includes(group.id),
                  })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => {}}
                  onClick={() => {
                    if (activeGroups.includes(group.id)) {
                      setActiveGroups(
                        activeGroups.filter((item) => item !== group.id),
                      );
                    } else {
                      setActiveGroups([...activeGroups, group.id]);
                    }
                  }}
                >
                  {group.name}
                </span>
              ))}
            </div>
          </div>
          <div className={css.sorting}>
            <div className={css.filterTitle}>Sorting</div>
            <div className={css.filterList}>
              {["A-Z", "Z-A", "Newest"].map((item) => (
                <span
                  key={item}
                  className={classNames(css.filterPill, {
                    [css.isActive]: sorting === item,
                  })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => {}}
                  onClick={() => {
                    if (sorting !== item) {
                      setSorting(item as SortingType);
                    }
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className={css.filterByColumns}>
            <div className={css.filterTitle}>Columns</div>
            <div className={css.filterBar}>
              <div className={css.bar}>
                <div className={css.barBackground} />
                <div
                  className={css.barActive}
                  style={{
                    width: `calc(${
                      (100 *
                        COLUMN_OPTIONS.findIndex(
                          (option) => option === columnCount,
                        )) /
                      (COLUMN_OPTIONS.length - 1)
                    }%`,
                  }}
                />
              </div>
              {COLUMN_OPTIONS.map((count) => (
                <span
                  key={count}
                  className={classNames(css.milestone, {
                    [css.isActive]: columnCount >= count,
                  })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => {}}
                  onClick={() => {
                    if (columnCount !== count) {
                      setColumnCount(count);
                    }
                  }}
                >
                  {count}
                </span>
              ))}
            </div>
          </div>
          <div className={css.byline}>
            <div className={css.gamesCount}>
              Game amount:
              <span>{` ${filteredGames.length}`}</span>
            </div>
            <button
              type="button"
              className={css.resetFilters}
              onClick={() => {
                resetFilters();
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
