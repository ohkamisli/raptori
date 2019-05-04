import { get } from './general'

describe('get', () => {
	describe('when no arguments are passed', () => {
		it('should return undefined', () => {
			expect(get()).toBe(undefined)
		})
	})

	describe('when the source is an object', () => {
		const source = {
			a: {
				b: {
					c: {
						d: {
							e: 'f',
						},
					},
				},
			},
		}

		describe('when the requested path exists', () => {
			it('should return the value', () => {
				expect(get(source, 'a')).toBe(source.a)
				expect(get(source, 'a', 'b')).toBe(source.a.b)
				expect(get(source, 'a', 'b', 'c')).toBe(source.a.b.c)
				expect(get(source, 'a', 'b', 'c', 'd')).toBe(source.a.b.c.d)
				expect(get(source, 'a', 'b', 'c', 'd', 'e')).toBe(
					source.a.b.c.d.e
				)
			})
		})

		describe('when the requested path does not exist', () => {
			it('should return undefined', () => {
				expect(get(source, '#')).toBe(undefined)
				expect(get(source, 'a', '#')).toBe(undefined)
				expect(get(source, 'a', 'b', '#')).toBe(undefined)
				expect(get(source, 'b', 'c', 'd', 'e', 'f')).toBe(undefined)
			})
		})

		describe('when no path is specified', () => {
			it('should return undefined', () => {
				expect(get(source)).toBe(undefined)
			})
		})
	})

	describe('when the source is a nested array', () => {
		const source = [
			'level one',
			[
				'level two',
				[
					'level three',
					['level four a'],
					['level four b', ['level five']],
				],
			],
		]

		describe('when the requested path exists', () => {
			expect(get(source, 0)).toBe(source[0])
			expect(get(source, 1, 0)).toBe(source[1][0])
			expect(get(source, 1, 1, 0)).toBe(source[1][1][0])
			expect(get(source, 1, 1, 1, 0)).toBe(source[1][1][1][0])
			expect(get(source, 1, 1, 2, 0)).toBe(source[1][1][2][0])
			expect(get(source, 1, 1, 2, 1, 0)).toBe(source[1][1][2][1][0])
		})

		describe('when the requested path does not exist', () => {
			expect(get(source, 2)).toBe(undefined)
			expect(get(source, 5, 10)).toBe(undefined)
			expect(get(source, 1, 2, 3, 4)).toBe(undefined)
		})

		describe('when no path is specified', () => {
			it('should return undefined', () => {
				expect(get(source)).toBe(undefined)
			})
		})
	})

	describe('when the source is mixed', () => {
		const source = {
			a: [{ b: 1 }, { b: 2, c: [{ d: 'e' }] }],
		}

		describe('when the requested path exists', () => {
			expect(get(source, 'a')).toBe(source.a)
			expect(get(source, 'a', 0)).toBe(source.a[0])
			expect(get(source, 'a', 0, 'b')).toBe(source.a[0].b)
			expect(get(source, 'a', 1)).toBe(source.a[1])
			expect(get(source, 'a', 1, 'b')).toBe(source.a[1].b)
			expect(get(source, 'a', 1, 'c')).toBe(source.a[1].c)
			expect(get(source, 'a', 1, 'c', 0)).toBe(source.a[1].c[0])
			expect(get(source, 'a', 1, 'c', 0, 'd')).toBe(source.a[1].c[0].d)
		})

		describe('when the requested path does not exist', () => {
			expect(get(source, 2)).toBe(undefined)
			expect(get(source, 'a', 10)).toBe(undefined)
			expect(get(source, 1, 'a', 3, 'b')).toBe(undefined)
			expect(get(source, 'a', 1, 'c', 5)).toBe(undefined)
		})

		describe('when no path is specified', () => {
			it('should return undefined', () => {
				expect(get(source)).toBe(undefined)
			})
		})
	})
})
