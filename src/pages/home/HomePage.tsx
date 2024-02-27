import { Anchor, Code, Container, Stack, Text } from '@mantine/core';
import { ReactNode } from 'react';
import { ScrollableCodeHighlight } from '../../components/ScrollableCodeHighlight.tsx';
import { HomeCard } from './HomeCard.tsx';
import { LoadFromFile } from './LoadFromFile.tsx';
import { LoadFromProsperity } from './LoadFromProsperity.tsx';
import { LoadFromUrl } from './LoadFromUrl.tsx';

export function HomePage(): ReactNode {
  const exampleCode = `
import json
from datamodel import Listing, Observation, Order, OrderDepth, ProsperityEncoder, Symbol, Trade, TradingState
from typing import Any

class Logger:
    def __init__(self) -> None:
        self.logs = ""

    def print(self, *objects: Any, sep: str = " ", end: str = "\\n") -> None:
        self.logs += sep.join(map(str, objects)) + end

    def flush(self, state: TradingState, orders: dict[Symbol, list[Order]], conversions: int, trader_data: str) -> None:
        print(json.dumps([
            self.compress_state(state),
            self.compress_orders(orders),
            conversions,
            trader_data,
            self.logs,
        ], cls=ProsperityEncoder, separators=(",", ":")))

        self.logs = ""

    def compress_state(self, state: TradingState) -> list[Any]:
        return [
            state.timestamp,
            state.traderData,
            self.compress_listings(state.listings),
            self.compress_order_depths(state.order_depths),
            self.compress_trades(state.own_trades),
            self.compress_trades(state.market_trades),
            state.position,
            self.compress_observations(state.observations),
        ]

    def compress_listings(self, listings: dict[Symbol, Listing]) -> list[list[Any]]:
        compressed = []
        for listing in listings.values():
            compressed.append([listing["symbol"], listing["product"], listing["denomination"]])

        return compressed

    def compress_order_depths(self, order_depths: dict[Symbol, OrderDepth]) -> dict[Symbol, list[Any]]:
        compressed = {}
        for symbol, order_depth in order_depths.items():
            compressed[symbol] = [order_depth.buy_orders, order_depth.sell_orders]

        return compressed

    def compress_trades(self, trades: dict[Symbol, list[Trade]]) -> list[list[Any]]:
        compressed = []
        for arr in trades.values():
            for trade in arr:
                compressed.append([
                    trade.symbol,
                    trade.price,
                    trade.quantity,
                    trade.buyer,
                    trade.seller,
                    trade.timestamp,
                ])

        return compressed

    def compress_observations(self, observations: Observation) -> list[Any]:
        conversion_observations = {}
        for product, observation in observations.conversionObservations.items():
            conversion_observations[product] = [
                observation.bidPrice,
                observation.askPrice,
                observation.transportFees,
                observation.exportTariff,
                observation.importTariff,
                observation.sunlight,
                observation.humidity,
            ]

        return [observations.plainValueObservations, conversion_observations]

    def compress_orders(self, orders: dict[Symbol, list[Order]]) -> list[list[Any]]:
        compressed = []
        for arr in orders.values():
            for order in arr:
                compressed.append([order.symbol, order.price, order.quantity])

        return compressed

logger = Logger()

class Trader:
    def run(self, state: TradingState) -> tuple[dict[Symbol, list[Order]], int, str]:
        orders = {}
        conversions = 0
        trader_data = ""

        # TODO: Add logic

        logger.flush(state, orders, conversions, trader_data)
        return orders, conversions, trader_data
  `.trim();

  return (
    <Container>
      <Stack>
        <HomeCard title="Welcome!">
          {/* prettier-ignore */}
          <Text>
            IMC Prosperity 2 Visualizer is a visualizer for <Anchor href="https://prosperity.imc.com/" target="_blank" rel="noreferrer">IMC Prosperity 2</Anchor> algorithms.
            Its source code is available in the <Anchor href="https://github.com/jmerle/imc-prosperity-2-visualizer" target="_blank" rel="noreferrer">jmerle/imc-prosperity-2-visualizer</Anchor> GitHub repository.
            It is based on the <Anchor href="https://jmerle.github.io/imc-prosperity-visualizer/" target="_blank" rel="noreferrer">IMC Prosperity 1 visualizer</Anchor> by the same author.
            Load an algorithm below to get started.
          </Text>
        </HomeCard>

        <HomeCard title="Prerequisites">
          <Text>
            IMC Prosperity 2 Visualizer assumes your algorithm logs in a certain format. Algorithms that use a different
            logging format may cause unexpected errors when opening them in the visualizer. Please use the following
            boilerplate for your algorithm (or adapt your algorithm to use the logger from this code) and use{' '}
            <Code>logger.print()</Code> where you would normally use <Code>print()</Code>:
          </Text>
          <ScrollableCodeHighlight code={exampleCode} language="python" />
        </HomeCard>

        <LoadFromFile />
        <LoadFromProsperity />
        <LoadFromUrl />
      </Stack>
    </Container>
  );
}
